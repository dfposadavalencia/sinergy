package com.endava.synergy.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A Activity.
 */
@Entity
@Table(name = "activity")
public class Activity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "place")
    private String place;

    @Column(name = "start_date")
    private Instant startDate;

    @Column(name = "end_date")
    private Instant endDate;

    @Column(name = "points")
    private Integer points;

    @Column(name = "status")
    private String status;

    @ManyToOne
    @JsonIgnoreProperties("activities")
    private Challenge challenge;

    @ManyToMany
    @JoinTable(name = "activity_tag",
               joinColumns = @JoinColumn(name = "activity_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "tag_id", referencedColumnName = "id"))
    private Set<Tag> tags = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("activities")
    private Agenda agenda;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Activity name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPlace() {
        return place;
    }

    public Activity place(String place) {
        this.place = place;
        return this;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public Instant getStartDate() {
        return startDate;
    }

    public Activity startDate(Instant startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public Instant getEndDate() {
        return endDate;
    }

    public Activity endDate(Instant endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(Instant endDate) {
        this.endDate = endDate;
    }

    public Integer getPoints() {
        return points;
    }

    public Activity points(Integer points) {
        this.points = points;
        return this;
    }

    public void setPoints(Integer points) {
        this.points = points;
    }

    public String getStatus() {
        return status;
    }

    public Activity status(String status) {
        this.status = status;
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Challenge getChallenge() {
        return challenge;
    }

    public Activity challenge(Challenge challenge) {
        this.challenge = challenge;
        return this;
    }

    public void setChallenge(Challenge challenge) {
        this.challenge = challenge;
    }

    public Set<Tag> getTags() {
        return tags;
    }

    public Activity tags(Set<Tag> tags) {
        this.tags = tags;
        return this;
    }

    public Activity addTag(Tag tag) {
        this.tags.add(tag);
        tag.getActivities().add(this);
        return this;
    }

    public Activity removeTag(Tag tag) {
        this.tags.remove(tag);
        tag.getActivities().remove(this);
        return this;
    }

    public void setTags(Set<Tag> tags) {
        this.tags = tags;
    }

    public Agenda getAgenda() {
        return agenda;
    }

    public Activity agenda(Agenda agenda) {
        this.agenda = agenda;
        return this;
    }

    public void setAgenda(Agenda agenda) {
        this.agenda = agenda;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Activity)) {
            return false;
        }
        return id != null && id.equals(((Activity) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Activity{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", place='" + getPlace() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", points=" + getPoints() +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
