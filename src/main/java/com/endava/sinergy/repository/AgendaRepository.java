package com.endava.sinergy.repository;

import com.endava.sinergy.domain.Agenda;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Agenda entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AgendaRepository extends JpaRepository<Agenda, Long> {

}
