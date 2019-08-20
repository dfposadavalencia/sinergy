package com.endava.synergy.service;

import com.endava.synergy.domain.UserSeason;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link UserSeason}.
 */
public interface UserSeasonService {

    /**
     * Save a userSeason.
     *
     * @param userSeason the entity to save.
     * @return the persisted entity.
     */
    UserSeason save(UserSeason userSeason);

    /**
     * Get all the userSeasons.
     *
     * @return the list of entities.
     */
    List<UserSeason> findAll();


    /**
     * Get the "id" userSeason.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<UserSeason> findOne(Long id);

    /**
     * Delete the "id" userSeason.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
