package com.endava.synergy.service.impl;

import com.endava.synergy.service.SeasonService;
import com.endava.synergy.domain.Season;
import com.endava.synergy.repository.SeasonRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Season}.
 */
@Service
@Transactional
public class SeasonServiceImpl implements SeasonService {

    private final Logger log = LoggerFactory.getLogger(SeasonServiceImpl.class);

    private final SeasonRepository seasonRepository;

    public SeasonServiceImpl(SeasonRepository seasonRepository) {
        this.seasonRepository = seasonRepository;
    }

    /**
     * Save a season.
     *
     * @param season the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Season save(Season season) {
        log.debug("Request to save Season : {}", season);
        return seasonRepository.save(season);
    }

    /**
     * Get all the seasons.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Season> findAll(Pageable pageable) {
        log.debug("Request to get all Seasons");
        return seasonRepository.findAll(pageable);
    }


    /**
     * Get one season by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Season> findOne(Long id) {
        log.debug("Request to get Season : {}", id);
        return seasonRepository.findById(id);
    }

    /**
     * Delete the season by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Season : {}", id);
        seasonRepository.deleteById(id);
    }
}
