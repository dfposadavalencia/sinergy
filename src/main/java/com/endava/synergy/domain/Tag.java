package com.endava.synergy.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Tag.
 */
@Entity
@Table(name = "tag")
public class Tag implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "label", nullable = false)
    private String label;

    @ManyToMany
    @JoinTable(name = "tag_field",
               joinColumns = @JoinColumn(name = "tag_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "field_id", referencedColumnName = "id"))
    private Set<Field> fields = new HashSet<>();

    @ManyToMany(mappedBy = "tags")
    @JsonIgnore
    private Set<Activity> activities = new HashSet<>();

    @ManyToMany(mappedBy = "tags")
    @JsonIgnore
    private Set<UserProfile> userProfiles = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public Tag label(String label) {
        this.label = label;
        return this;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public Set<Field> getFields() {
        return fields;
    }

    public Tag fields(Set<Field> fields) {
        this.fields = fields;
        return this;
    }

    public Tag addField(Field field) {
        this.fields.add(field);
        field.getTags().add(this);
        return this;
    }

    public Tag removeField(Field field) {
        this.fields.remove(field);
        field.getTags().remove(this);
        return this;
    }

    public void setFields(Set<Field> fields) {
        this.fields = fields;
    }

    public Set<Activity> getActivities() {
        return activities;
    }

    public Tag activities(Set<Activity> activities) {
        this.activities = activities;
        return this;
    }

    public Tag addActivity(Activity activity) {
        this.activities.add(activity);
        activity.getTags().add(this);
        return this;
    }

    public Tag removeActivity(Activity activity) {
        this.activities.remove(activity);
        activity.getTags().remove(this);
        return this;
    }

    public void setActivities(Set<Activity> activities) {
        this.activities = activities;
    }

    public Set<UserProfile> getUserProfiles() {
        return userProfiles;
    }

    public Tag userProfiles(Set<UserProfile> userProfiles) {
        this.userProfiles = userProfiles;
        return this;
    }

    public Tag addUserProfile(UserProfile userProfile) {
        this.userProfiles.add(userProfile);
        userProfile.getTags().add(this);
        return this;
    }

    public Tag removeUserProfile(UserProfile userProfile) {
        this.userProfiles.remove(userProfile);
        userProfile.getTags().remove(this);
        return this;
    }

    public void setUserProfiles(Set<UserProfile> userProfiles) {
        this.userProfiles = userProfiles;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Tag)) {
            return false;
        }
        return id != null && id.equals(((Tag) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Tag{" +
            "id=" + getId() +
            ", label='" + getLabel() + "'" +
            "}";
    }
}
