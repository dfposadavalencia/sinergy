package com.endava.synergy.service.impl;

import com.endava.synergy.service.ActivityService;
import com.endava.synergy.service.UserProfileService;
import com.endava.synergy.service.TagService;
import com.endava.synergy.domain.Activity;
import com.endava.synergy.domain.Tag;
import com.endava.synergy.domain.UserProfile;
import com.endava.synergy.repository.ActivityRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;
import java.util.Set;

/**
 * Service Implementation for managing {@link Activity}.
 */
@Service
@Transactional
public class ActivityServiceImpl implements ActivityService {

	private static Calendar today = Calendar.getInstance();
    private static boolean executed = false;

	private final Logger log = LoggerFactory.getLogger(ActivityServiceImpl.class);

    private final ActivityRepository activityRepository;
    private final UserProfileService userProfileService;
    private final TagService tagService;

    public ActivityServiceImpl(ActivityRepository activityRepository, UserProfileService userProfileService, TagService tagService) {
        this.activityRepository = activityRepository;
        this.userProfileService = userProfileService;
        this.tagService = tagService;
    }

    /**
     * Save a activity.
     *
     * @param activity the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Activity save(Activity activity) {
        log.debug("Request to save Activity : {}", activity);
        return activityRepository.save(activity);
    }

    /**
     * Get all the activities.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    public Page<Activity> findAll(Pageable pageable) {

    	//create recommended activities
    	Calendar now = Calendar.getInstance();

    	if (today.get(Calendar.HOUR_OF_DAY/*DAY_OF_YEAR*/) != now.get(Calendar.HOUR_OF_DAY/*DAY_OF_YEAR*/)) {
    	    today = now;
            executed = false;
        }

    	//if (!executed) {// only do this if the day is new
    		//today = now;
            executed = true;

	    	Page<UserProfile> userProfiles = userProfileService.findAll(pageable);

	    	List<UserProfile> list1 =  userProfiles.getContent();
	    	List<UserProfile> list2 =  userProfiles.getContent();

	    	int i = 0;
	    	while (i < list1.size()) {
	    		UserProfile userProfile = list1.get(i);
	    		Set<Tag> user1tags = userProfile.getTags();
	    		Long idUser1 = userProfile.getId();


	    		for(Tag tag : user1tags) {

	    			int j = i + 1;
	    			while (j < list2.size()) {
	    				UserProfile userProfile2 = list2.get(j);
	    				Set<Tag> user2tags = userProfile2.getTags();
	    				Long idUser2 = userProfile2.getId();

	    				if (idUser1 != idUser2) {
	    					for(Tag tag2 : user2tags) {
	    						if (tag.getLabel().equals(tag2.getLabel())) {

	    							if (!existTagActivity(tag.getLabel())) {

		    							// 2 persons with the same tag, lets create an activity
		    							Activity activity = new Activity();
		    							activity.addTag(tag);
		    							activity.setName("Pass it on for " + tag.getLabel());
		    							activity.setPlace("Endava Office");
		    							activity.setStartDate(Instant.now().plusSeconds(604800));//add a week
		    							activity.setEndDate(Instant.now().plusSeconds(604800));//add a week
		    							activity.setStatus(Activity.PENDING);
		    							save(activity);
	    							}
	    						}
	    					}


	    				}
	    				j++;
	    			}
	    		}

                int k = i + 1;
                while (k < list2.size()) {
                    UserProfile userProfile2 = list2.get(k);
                    Long idUser2 = userProfile2.getId();

                    if (idUser1 != idUser2) {

                        log.debug("Voice user1:" + userProfile.getId() + ":" + userProfile.getVoice() + ":Voice user2:"  + userProfile2.getId() + ":" + userProfile2.getVoice() + ":");

                        if (userProfile.getVoice().equals(userProfile2.getVoice())) {
                            log.debug("Entre voice condicional");

                            if (!existTagActivity(userProfile.getVoice())) {
                                log.debug("Entre crear tag-actividad");
                                // 2 persons with the same voice, lets create an activity for that voice
                                Activity activity = new Activity();

                                Tag voiceTag = new Tag();
                                voiceTag.setLabel(userProfile.getVoice());
                                tagService.save(voiceTag);

                                activity.addTag(voiceTag);
                                activity.setName("Pass it on for " + userProfile.getVoice());
                                activity.setPlace("Endava Office");
                                activity.setStartDate(Instant.now().plusSeconds(604800));//add a week
                                activity.setEndDate(Instant.now().plusSeconds(604800));//add a week
                                activity.setStatus(Activity.PENDING);
                                save(activity);
                            }
                        }
                    }
                    k++;
                }

	    		i++;
	    	}
    	//}

        log.debug("Request to get all Activities");
        return activityRepository.findAll(pageable);
    }

    private boolean existTagActivity(String tagLabel) {
    	List<Activity> activities = activityRepository.findAllWithEagerRelationships();
    	for (Activity activity : activities) {
    		Set<Tag> activityTags = activity.getTags();
    		for (Tag activityTag : activityTags) {
    			if (activityTag.getLabel().equals(tagLabel) && activity.getStatus().equals(Activity.PENDING)) {
    				return true; // there is at least one activity with that tag and the same status
    			}
    		}
    	}
    	return false;
    }

    /**
     * Get all the activities with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<Activity> findAllWithEagerRelationships(Pageable pageable) {
        return activityRepository.findAllWithEagerRelationships(pageable);
    }


    /**
     * Get one activity by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Activity> findOne(Long id) {
        log.debug("Request to get Activity : {}", id);
        return activityRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the activity by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Activity : {}", id);
        activityRepository.deleteById(id);
    }
}
