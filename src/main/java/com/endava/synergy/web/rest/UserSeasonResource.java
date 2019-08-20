package com.endava.synergy.web.rest;

import com.endava.synergy.domain.UserSeason;
import com.endava.synergy.service.UserSeasonService;
import com.endava.synergy.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.endava.synergy.domain.UserSeason}.
 */
@RestController
@RequestMapping("/api")
public class UserSeasonResource {

    private final Logger log = LoggerFactory.getLogger(UserSeasonResource.class);

    private static final String ENTITY_NAME = "userSeason";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UserSeasonService userSeasonService;

    public UserSeasonResource(UserSeasonService userSeasonService) {
        this.userSeasonService = userSeasonService;
    }

    /**
     * {@code POST  /user-seasons} : Create a new userSeason.
     *
     * @param userSeason the userSeason to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new userSeason, or with status {@code 400 (Bad Request)} if the userSeason has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/user-seasons")
    public ResponseEntity<UserSeason> createUserSeason(@Valid @RequestBody UserSeason userSeason) throws URISyntaxException {
        log.debug("REST request to save UserSeason : {}", userSeason);
        if (userSeason.getId() != null) {
            throw new BadRequestAlertException("A new userSeason cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserSeason result = userSeasonService.save(userSeason);
        return ResponseEntity.created(new URI("/api/user-seasons/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /user-seasons} : Updates an existing userSeason.
     *
     * @param userSeason the userSeason to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated userSeason,
     * or with status {@code 400 (Bad Request)} if the userSeason is not valid,
     * or with status {@code 500 (Internal Server Error)} if the userSeason couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/user-seasons")
    public ResponseEntity<UserSeason> updateUserSeason(@Valid @RequestBody UserSeason userSeason) throws URISyntaxException {
        log.debug("REST request to update UserSeason : {}", userSeason);
        if (userSeason.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        UserSeason result = userSeasonService.save(userSeason);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, userSeason.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /user-seasons} : get all the userSeasons.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of userSeasons in body.
     */
    @GetMapping("/user-seasons")
    public List<UserSeason> getAllUserSeasons() {
        log.debug("REST request to get all UserSeasons");
        return userSeasonService.findAll();
    }

    /**
     * {@code GET  /user-seasons/:id} : get the "id" userSeason.
     *
     * @param id the id of the userSeason to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the userSeason, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/user-seasons/{id}")
    public ResponseEntity<UserSeason> getUserSeason(@PathVariable Long id) {
        log.debug("REST request to get UserSeason : {}", id);
        Optional<UserSeason> userSeason = userSeasonService.findOne(id);
        return ResponseUtil.wrapOrNotFound(userSeason);
    }

    /**
     * {@code DELETE  /user-seasons/:id} : delete the "id" userSeason.
     *
     * @param id the id of the userSeason to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/user-seasons/{id}")
    public ResponseEntity<Void> deleteUserSeason(@PathVariable Long id) {
        log.debug("REST request to delete UserSeason : {}", id);
        userSeasonService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
