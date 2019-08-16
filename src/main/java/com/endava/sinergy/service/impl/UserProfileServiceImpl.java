package com.endava.sinergy.service.impl;

import com.endava.sinergy.service.UserProfileService;
import com.endava.sinergy.domain.UserProfile;
import com.endava.sinergy.repository.UserProfileRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link UserProfile}.
 */
@Service
@Transactional
public class UserProfileServiceImpl implements UserProfileService {

    private final Logger log = LoggerFactory.getLogger(UserProfileServiceImpl.class);

    private final UserProfileRepository userProfileRepository;

    public UserProfileServiceImpl(UserProfileRepository userProfileRepository) {
        this.userProfileRepository = userProfileRepository;
    }

    /**
     * Save a userProfile.
     *
     * @param userProfile the entity to save.
     * @return the persisted entity.
     */
    @Override
    public UserProfile save(UserProfile userProfile) {
        log.debug("Request to save UserProfile : {}", userProfile);
        return userProfileRepository.save(userProfile);
    }

    /**
     * Get all the userProfiles.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<UserProfile> findAll(Pageable pageable) {
        log.debug("Request to get all UserProfiles");
        return userProfileRepository.findAll(pageable);
    }

    /**
     * Get all the userProfiles with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<UserProfile> findAllWithEagerRelationships(Pageable pageable) {
        return userProfileRepository.findAllWithEagerRelationships(pageable);
    }
    

    /**
     * Get one userProfile by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<UserProfile> findOne(Long id) {
        log.debug("Request to get UserProfile : {}", id);
        return userProfileRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the userProfile by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete UserProfile : {}", id);
        userProfileRepository.deleteById(id);
    }
}
