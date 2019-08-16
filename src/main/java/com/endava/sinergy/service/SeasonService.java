package com.endava.sinergy.service;

import com.endava.sinergy.domain.Season;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Season}.
 */
public interface SeasonService {

    /**
     * Save a season.
     *
     * @param season the entity to save.
     * @return the persisted entity.
     */
    Season save(Season season);

    /**
     * Get all the seasons.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Season> findAll(Pageable pageable);


    /**
     * Get the "id" season.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Season> findOne(Long id);

    /**
     * Delete the "id" season.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
