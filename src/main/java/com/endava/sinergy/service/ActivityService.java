package com.endava.sinergy.service;

import com.endava.sinergy.domain.Activity;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Activity}.
 */
public interface ActivityService {

    /**
     * Save a activity.
     *
     * @param activity the entity to save.
     * @return the persisted entity.
     */
    Activity save(Activity activity);

    /**
     * Get all the activities.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Activity> findAll(Pageable pageable);

    /**
     * Get all the activities with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    Page<Activity> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" activity.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Activity> findOne(Long id);

    /**
     * Delete the "id" activity.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
