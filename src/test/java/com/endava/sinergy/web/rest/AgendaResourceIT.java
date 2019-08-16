package com.endava.sinergy.web.rest;

import com.endava.sinergy.SinergyApp;
import com.endava.sinergy.domain.Agenda;
import com.endava.sinergy.repository.AgendaRepository;
import com.endava.sinergy.service.AgendaService;
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
 * Integration tests for the {@link AgendaResource} REST controller.
 */
@SpringBootTest(classes = SinergyApp.class)
public class AgendaResourceIT {

    private static final Boolean DEFAULT_ATTENDANCE = false;
    private static final Boolean UPDATED_ATTENDANCE = true;

    private static final Integer DEFAULT_ACTIVITY_SCORING = 1;
    private static final Integer UPDATED_ACTIVITY_SCORING = 2;
    private static final Integer SMALLER_ACTIVITY_SCORING = 1 - 1;

    private static final Integer DEFAULT_MODERATOR_SCORING = 1;
    private static final Integer UPDATED_MODERATOR_SCORING = 2;
    private static final Integer SMALLER_MODERATOR_SCORING = 1 - 1;

    @Autowired
    private AgendaRepository agendaRepository;

    @Autowired
    private AgendaService agendaService;

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

    private MockMvc restAgendaMockMvc;

    private Agenda agenda;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AgendaResource agendaResource = new AgendaResource(agendaService);
        this.restAgendaMockMvc = MockMvcBuilders.standaloneSetup(agendaResource)
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
    public static Agenda createEntity(EntityManager em) {
        Agenda agenda = new Agenda()
            .attendance(DEFAULT_ATTENDANCE)
            .activityScoring(DEFAULT_ACTIVITY_SCORING)
            .moderatorScoring(DEFAULT_MODERATOR_SCORING);
        return agenda;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Agenda createUpdatedEntity(EntityManager em) {
        Agenda agenda = new Agenda()
            .attendance(UPDATED_ATTENDANCE)
            .activityScoring(UPDATED_ACTIVITY_SCORING)
            .moderatorScoring(UPDATED_MODERATOR_SCORING);
        return agenda;
    }

    @BeforeEach
    public void initTest() {
        agenda = createEntity(em);
    }

    @Test
    @Transactional
    public void createAgenda() throws Exception {
        int databaseSizeBeforeCreate = agendaRepository.findAll().size();

        // Create the Agenda
        restAgendaMockMvc.perform(post("/api/agenda")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agenda)))
            .andExpect(status().isCreated());

        // Validate the Agenda in the database
        List<Agenda> agendaList = agendaRepository.findAll();
        assertThat(agendaList).hasSize(databaseSizeBeforeCreate + 1);
        Agenda testAgenda = agendaList.get(agendaList.size() - 1);
        assertThat(testAgenda.isAttendance()).isEqualTo(DEFAULT_ATTENDANCE);
        assertThat(testAgenda.getActivityScoring()).isEqualTo(DEFAULT_ACTIVITY_SCORING);
        assertThat(testAgenda.getModeratorScoring()).isEqualTo(DEFAULT_MODERATOR_SCORING);
    }

    @Test
    @Transactional
    public void createAgendaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = agendaRepository.findAll().size();

        // Create the Agenda with an existing ID
        agenda.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAgendaMockMvc.perform(post("/api/agenda")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agenda)))
            .andExpect(status().isBadRequest());

        // Validate the Agenda in the database
        List<Agenda> agendaList = agendaRepository.findAll();
        assertThat(agendaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAgenda() throws Exception {
        // Initialize the database
        agendaRepository.saveAndFlush(agenda);

        // Get all the agendaList
        restAgendaMockMvc.perform(get("/api/agenda?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(agenda.getId().intValue())))
            .andExpect(jsonPath("$.[*].attendance").value(hasItem(DEFAULT_ATTENDANCE.booleanValue())))
            .andExpect(jsonPath("$.[*].activityScoring").value(hasItem(DEFAULT_ACTIVITY_SCORING)))
            .andExpect(jsonPath("$.[*].moderatorScoring").value(hasItem(DEFAULT_MODERATOR_SCORING)));
    }
    
    @Test
    @Transactional
    public void getAgenda() throws Exception {
        // Initialize the database
        agendaRepository.saveAndFlush(agenda);

        // Get the agenda
        restAgendaMockMvc.perform(get("/api/agenda/{id}", agenda.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(agenda.getId().intValue()))
            .andExpect(jsonPath("$.attendance").value(DEFAULT_ATTENDANCE.booleanValue()))
            .andExpect(jsonPath("$.activityScoring").value(DEFAULT_ACTIVITY_SCORING))
            .andExpect(jsonPath("$.moderatorScoring").value(DEFAULT_MODERATOR_SCORING));
    }

    @Test
    @Transactional
    public void getNonExistingAgenda() throws Exception {
        // Get the agenda
        restAgendaMockMvc.perform(get("/api/agenda/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAgenda() throws Exception {
        // Initialize the database
        agendaService.save(agenda);

        int databaseSizeBeforeUpdate = agendaRepository.findAll().size();

        // Update the agenda
        Agenda updatedAgenda = agendaRepository.findById(agenda.getId()).get();
        // Disconnect from session so that the updates on updatedAgenda are not directly saved in db
        em.detach(updatedAgenda);
        updatedAgenda
            .attendance(UPDATED_ATTENDANCE)
            .activityScoring(UPDATED_ACTIVITY_SCORING)
            .moderatorScoring(UPDATED_MODERATOR_SCORING);

        restAgendaMockMvc.perform(put("/api/agenda")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAgenda)))
            .andExpect(status().isOk());

        // Validate the Agenda in the database
        List<Agenda> agendaList = agendaRepository.findAll();
        assertThat(agendaList).hasSize(databaseSizeBeforeUpdate);
        Agenda testAgenda = agendaList.get(agendaList.size() - 1);
        assertThat(testAgenda.isAttendance()).isEqualTo(UPDATED_ATTENDANCE);
        assertThat(testAgenda.getActivityScoring()).isEqualTo(UPDATED_ACTIVITY_SCORING);
        assertThat(testAgenda.getModeratorScoring()).isEqualTo(UPDATED_MODERATOR_SCORING);
    }

    @Test
    @Transactional
    public void updateNonExistingAgenda() throws Exception {
        int databaseSizeBeforeUpdate = agendaRepository.findAll().size();

        // Create the Agenda

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAgendaMockMvc.perform(put("/api/agenda")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agenda)))
            .andExpect(status().isBadRequest());

        // Validate the Agenda in the database
        List<Agenda> agendaList = agendaRepository.findAll();
        assertThat(agendaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAgenda() throws Exception {
        // Initialize the database
        agendaService.save(agenda);

        int databaseSizeBeforeDelete = agendaRepository.findAll().size();

        // Delete the agenda
        restAgendaMockMvc.perform(delete("/api/agenda/{id}", agenda.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Agenda> agendaList = agendaRepository.findAll();
        assertThat(agendaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Agenda.class);
        Agenda agenda1 = new Agenda();
        agenda1.setId(1L);
        Agenda agenda2 = new Agenda();
        agenda2.setId(agenda1.getId());
        assertThat(agenda1).isEqualTo(agenda2);
        agenda2.setId(2L);
        assertThat(agenda1).isNotEqualTo(agenda2);
        agenda1.setId(null);
        assertThat(agenda1).isNotEqualTo(agenda2);
    }
}
