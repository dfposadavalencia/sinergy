package com.endava.synergy.repository;

import com.endava.synergy.domain.Challenge;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Challenge entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ChallengeRepository extends JpaRepository<Challenge, Long> {

}
