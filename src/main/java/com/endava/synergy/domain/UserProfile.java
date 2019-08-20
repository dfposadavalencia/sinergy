package com.endava.synergy.domain;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A UserProfile.
 */
@Entity
@Table(name = "user_profile")
public class UserProfile implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "grade")
    private String grade;

    @Column(name = "voice")
    private String voice;

    @OneToMany(mappedBy = "userProfile")
    private Set<Agenda> agenda = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "user_profile_season",
               joinColumns = @JoinColumn(name = "user_profile_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "season_id", referencedColumnName = "id"))
    private Set<Season> seasons = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGrade() {
        return grade;
    }

    public UserProfile grade(String grade) {
        this.grade = grade;
        return this;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public String getVoice() {
        return voice;
    }

    public UserProfile voice(String voice) {
        this.voice = voice;
        return this;
    }

    public void setVoice(String voice) {
        this.voice = voice;
    }

    public Set<Agenda> getAgenda() {
        return agenda;
    }

    public UserProfile agenda(Set<Agenda> agenda) {
        this.agenda = agenda;
        return this;
    }

    public UserProfile addAgenda(Agenda agenda) {
        this.agenda.add(agenda);
        agenda.setUserProfile(this);
        return this;
    }

    public UserProfile removeAgenda(Agenda agenda) {
        this.agenda.remove(agenda);
        agenda.setUserProfile(null);
        return this;
    }

    public void setAgenda(Set<Agenda> agenda) {
        this.agenda = agenda;
    }

    public Set<Season> getSeasons() {
        return seasons;
    }

    public UserProfile seasons(Set<Season> seasons) {
        this.seasons = seasons;
        return this;
    }

    public UserProfile addSeason(Season season) {
        this.seasons.add(season);
        season.getUserProfiles().add(this);
        return this;
    }

    public UserProfile removeSeason(Season season) {
        this.seasons.remove(season);
        season.getUserProfiles().remove(this);
        return this;
    }

    public void setSeasons(Set<Season> seasons) {
        this.seasons = seasons;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UserProfile)) {
            return false;
        }
        return id != null && id.equals(((UserProfile) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "UserProfile{" +
            "id=" + getId() +
            ", grade='" + getGrade() + "'" +
            ", voice='" + getVoice() + "'" +
            "}";
    }
}
