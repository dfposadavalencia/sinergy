package com.endava.synergy.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Agenda.
 */
@Entity
@Table(name = "agenda")
public class Agenda implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "attendance")
    private Boolean attendance;

    @Column(name = "activity_scoring")
    private Integer activityScoring;

    @Column(name = "moderator_scoring")
    private Integer moderatorScoring;

    @ManyToOne
    @JsonIgnoreProperties("agenda")
    private UserProfile userProfile;

    @OneToMany(mappedBy = "agenda")
    private Set<Activity> activities = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isAttendance() {
        return attendance;
    }

    public Agenda attendance(Boolean attendance) {
        this.attendance = attendance;
        return this;
    }

    public void setAttendance(Boolean attendance) {
        this.attendance = attendance;
    }

    public Integer getActivityScoring() {
        return activityScoring;
    }

    public Agenda activityScoring(Integer activityScoring) {
        this.activityScoring = activityScoring;
        return this;
    }

    public void setActivityScoring(Integer activityScoring) {
        this.activityScoring = activityScoring;
    }

    public Integer getModeratorScoring() {
        return moderatorScoring;
    }

    public Agenda moderatorScoring(Integer moderatorScoring) {
        this.moderatorScoring = moderatorScoring;
        return this;
    }

    public void setModeratorScoring(Integer moderatorScoring) {
        this.moderatorScoring = moderatorScoring;
    }

    public UserProfile getUserProfile() {
        return userProfile;
    }

    public Agenda userProfile(UserProfile userProfile) {
        this.userProfile = userProfile;
        return this;
    }

    public void setUserProfile(UserProfile userProfile) {
        this.userProfile = userProfile;
    }

    public Set<Activity> getActivities() {
        return activities;
    }

    public Agenda activities(Set<Activity> activities) {
        this.activities = activities;
        return this;
    }

    public Agenda addActivity(Activity activity) {
        this.activities.add(activity);
        activity.setAgenda(this);
        return this;
    }

    public Agenda removeActivity(Activity activity) {
        this.activities.remove(activity);
        activity.setAgenda(null);
        return this;
    }

    public void setActivities(Set<Activity> activities) {
        this.activities = activities;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Agenda)) {
            return false;
        }
        return id != null && id.equals(((Agenda) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Agenda{" +
            "id=" + getId() +
            ", attendance='" + isAttendance() + "'" +
            ", activityScoring=" + getActivityScoring() +
            ", moderatorScoring=" + getModeratorScoring() +
            "}";
    }
}
