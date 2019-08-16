package com.endava.sinergy.service.impl;

import com.endava.sinergy.service.UserSeasonService;
import com.endava.sinergy.domain.UserSeason;
import com.endava.sinergy.repository.UserSeasonRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link UserSeason}.
 */
@Service
@Transactional
public class UserSeasonServiceImpl implements UserSeasonService {

    private final Logger log = LoggerFactory.getLogger(UserSeasonServiceImpl.class);

    private final UserSeasonRepository userSeasonRepository;

    public UserSeasonServiceImpl(UserSeasonRepository userSeasonRepository) {
        this.userSeasonRepository = userSeasonRepository;
    }

    /**
     * Save a userSeason.
     *
     * @param userSeason the entity to save.
     * @return the persisted entity.
     */
    @Override
    public UserSeason save(UserSeason userSeason) {
        log.debug("Request to save UserSeason : {}", userSeason);
        return userSeasonRepository.save(userSeason);
    }

    /**
     * Get all the userSeasons.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<UserSeason> findAll() {
        log.debug("Request to get all UserSeasons");
        return userSeasonRepository.findAll();
    }


    /**
     * Get one userSeason by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<UserSeason> findOne(Long id) {
        log.debug("Request to get UserSeason : {}", id);
        return userSeasonRepository.findById(id);
    }

    /**
     * Delete the userSeason by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete UserSeason : {}", id);
        userSeasonRepository.deleteById(id);
    }
}
