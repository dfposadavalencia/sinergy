package com.endava.sinergy.service.impl;

import com.endava.sinergy.service.ChallengeService;
import com.endava.sinergy.domain.Challenge;
import com.endava.sinergy.repository.ChallengeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Challenge}.
 */
@Service
@Transactional
public class ChallengeServiceImpl implements ChallengeService {

    private final Logger log = LoggerFactory.getLogger(ChallengeServiceImpl.class);

    private final ChallengeRepository challengeRepository;

    public ChallengeServiceImpl(ChallengeRepository challengeRepository) {
        this.challengeRepository = challengeRepository;
    }

    /**
     * Save a challenge.
     *
     * @param challenge the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Challenge save(Challenge challenge) {
        log.debug("Request to save Challenge : {}", challenge);
        return challengeRepository.save(challenge);
    }

    /**
     * Get all the challenges.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Challenge> findAll(Pageable pageable) {
        log.debug("Request to get all Challenges");
        return challengeRepository.findAll(pageable);
    }


    /**
     * Get one challenge by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Challenge> findOne(Long id) {
        log.debug("Request to get Challenge : {}", id);
        return challengeRepository.findById(id);
    }

    /**
     * Delete the challenge by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Challenge : {}", id);
        challengeRepository.deleteById(id);
    }
}
