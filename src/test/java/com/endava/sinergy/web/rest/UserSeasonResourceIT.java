package com.endava.sinergy.web.rest;

import com.endava.sinergy.SinergyApp;
import com.endava.sinergy.domain.UserSeason;
import com.endava.sinergy.repository.UserSeasonRepository;
import com.endava.sinergy.service.UserSeasonService;
import com.endava.sinergy.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.endava.sinergy.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link UserSeasonResource} REST controller.
 */
@SpringBootTest(classes = SinergyApp.class)
public class UserSeasonResourceIT {

    private static final String DEFAULT_RANKING = "AAAAAAAAAA";
    private static final String UPDATED_RANKING = "BBBBBBBBBB";

    private static final Integer DEFAULT_SCORE = 1;
    private static final Integer UPDATED_SCORE = 2;
    private static final Integer SMALLER_SCORE = 1 - 1;

    @Autowired
    private UserSeasonRepository userSeasonRepository;

    @Autowired
    private UserSeasonService userSeasonService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restUserSeasonMockMvc;

    private UserSeason userSeason;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UserSeasonResource userSeasonResource = new UserSeasonResource(userSeasonService);
        this.restUserSeasonMockMvc = MockMvcBuilders.standaloneSetup(userSeasonResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserSeason createEntity(EntityManager em) {
        UserSeason userSeason = new UserSeason()
            .ranking(DEFAULT_RANKING)
            .score(DEFAULT_SCORE);
        return userSeason;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserSeason createUpdatedEntity(EntityManager em) {
        UserSeason userSeason = new UserSeason()
            .ranking(UPDATED_RANKING)
            .score(UPDATED_SCORE);
        return userSeason;
    }

    @BeforeEach
    public void initTest() {
        userSeason = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserSeason() throws Exception {
        int databaseSizeBeforeCreate = userSeasonRepository.findAll().size();

        // Create the UserSeason
        restUserSeasonMockMvc.perform(post("/api/user-seasons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userSeason)))
            .andExpect(status().isCreated());

        // Validate the UserSeason in the database
        List<UserSeason> userSeasonList = userSeasonRepository.findAll();
        assertThat(userSeasonList).hasSize(databaseSizeBeforeCreate + 1);
        UserSeason testUserSeason = userSeasonList.get(userSeasonList.size() - 1);
        assertThat(testUserSeason.getRanking()).isEqualTo(DEFAULT_RANKING);
        assertThat(testUserSeason.getScore()).isEqualTo(DEFAULT_SCORE);
    }

    @Test
    @Transactional
    public void createUserSeasonWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userSeasonRepository.findAll().size();

        // Create the UserSeason with an existing ID
        userSeason.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserSeasonMockMvc.perform(post("/api/user-seasons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userSeason)))
            .andExpect(status().isBadRequest());

        // Validate the UserSeason in the database
        List<UserSeason> userSeasonList = userSeasonRepository.findAll();
        assertThat(userSeasonList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkScoreIsRequired() throws Exception {
        int databaseSizeBeforeTest = userSeasonRepository.findAll().size();
        // set the field null
        userSeason.setScore(null);

        // Create the UserSeason, which fails.

        restUserSeasonMockMvc.perform(post("/api/user-seasons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userSeason)))
            .andExpect(status().isBadRequest());

        List<UserSeason> userSeasonList = userSeasonRepository.findAll();
        assertThat(userSeasonList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllUserSeasons() throws Exception {
        // Initialize the database
        userSeasonRepository.saveAndFlush(userSeason);

        // Get all the userSeasonList
        restUserSeasonMockMvc.perform(get("/api/user-seasons?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userSeason.getId().intValue())))
            .andExpect(jsonPath("$.[*].ranking").value(hasItem(DEFAULT_RANKING.toString())))
            .andExpect(jsonPath("$.[*].score").value(hasItem(DEFAULT_SCORE)));
    }
    
    @Test
    @Transactional
    public void getUserSeason() throws Exception {
        // Initialize the database
        userSeasonRepository.saveAndFlush(userSeason);

        // Get the userSeason
        restUserSeasonMockMvc.perform(get("/api/user-seasons/{id}", userSeason.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(userSeason.getId().intValue()))
            .andExpect(jsonPath("$.ranking").value(DEFAULT_RANKING.toString()))
            .andExpect(jsonPath("$.score").value(DEFAULT_SCORE));
    }

    @Test
    @Transactional
    public void getNonExistingUserSeason() throws Exception {
        // Get the userSeason
        restUserSeasonMockMvc.perform(get("/api/user-seasons/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserSeason() throws Exception {
        // Initialize the database
        userSeasonService.save(userSeason);

        int databaseSizeBeforeUpdate = userSeasonRepository.findAll().size();

        // Update the userSeason
        UserSeason updatedUserSeason = userSeasonRepository.findById(userSeason.getId()).get();
        // Disconnect from session so that the updates on updatedUserSeason are not directly saved in db
        em.detach(updatedUserSeason);
        updatedUserSeason
            .ranking(UPDATED_RANKING)
            .score(UPDATED_SCORE);

        restUserSeasonMockMvc.perform(put("/api/user-seasons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUserSeason)))
            .andExpect(status().isOk());

        // Validate the UserSeason in the database
        List<UserSeason> userSeasonList = userSeasonRepository.findAll();
        assertThat(userSeasonList).hasSize(databaseSizeBeforeUpdate);
        UserSeason testUserSeason = userSeasonList.get(userSeasonList.size() - 1);
        assertThat(testUserSeason.getRanking()).isEqualTo(UPDATED_RANKING);
        assertThat(testUserSeason.getScore()).isEqualTo(UPDATED_SCORE);
    }

    @Test
    @Transactional
    public void updateNonExistingUserSeason() throws Exception {
        int databaseSizeBeforeUpdate = userSeasonRepository.findAll().size();

        // Create the UserSeason

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUserSeasonMockMvc.perform(put("/api/user-seasons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userSeason)))
            .andExpect(status().isBadRequest());

        // Validate the UserSeason in the database
        List<UserSeason> userSeasonList = userSeasonRepository.findAll();
        assertThat(userSeasonList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUserSeason() throws Exception {
        // Initialize the database
        userSeasonService.save(userSeason);

        int databaseSizeBeforeDelete = userSeasonRepository.findAll().size();

        // Delete the userSeason
        restUserSeasonMockMvc.perform(delete("/api/user-seasons/{id}", userSeason.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<UserSeason> userSeasonList = userSeasonRepository.findAll();
        assertThat(userSeasonList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserSeason.class);
        UserSeason userSeason1 = new UserSeason();
        userSeason1.setId(1L);
        UserSeason userSeason2 = new UserSeason();
        userSeason2.setId(userSeason1.getId());
        assertThat(userSeason1).isEqualTo(userSeason2);
        userSeason2.setId(2L);
        assertThat(userSeason1).isNotEqualTo(userSeason2);
        userSeason1.setId(null);
        assertThat(userSeason1).isNotEqualTo(userSeason2);
    }
}
