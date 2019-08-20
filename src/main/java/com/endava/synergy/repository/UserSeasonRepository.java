package com.endava.synergy.repository;

import com.endava.synergy.domain.UserSeason;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the UserSeason entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserSeasonRepository extends JpaRepository<UserSeason, Long> {

}
