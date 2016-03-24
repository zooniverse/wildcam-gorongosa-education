const Resources = (props) => (
  <div className="admin-component resources">
  <h1>Educator Resources</h1>
    <p>WildCam Lab allows students to filter data generated through the WildCam Gorongosa citizen science project, to ask questions and test hypotheses. We have developed a number of activities to guide educators and students through this exploration. Existing WildCam Lab Activities are listed below; we will continue to update the list with new activities.</p>

    <p>To support further exploration of ecological topics using Gorongosa National Park as a case study, HHMI BioInteractive provides a wealth of additional free educational resources, all aligned to national curriculum standards. These are listed below under "Related Resources".</p> 

    <h2>WildCam Labs Activities</h2>
    
    <ul>
      <li>
          <img src={require('../images/resources/1_ScientificInquiry_thumb.jpg')} />
          <h3>Scientific Inquiry Using WildCam Gorongosa</h3>
          <p>ACTIVITY</p>
          <p>In this activity, students will be guided through the investigation of a scientific question, using data from trail cameras in Gorongosa National Park. View Activity></p>
      </li>

      <li>
        <img src={require('../images/resources/2_BuildingEcologicalPyramids_thumb.jpg')} />
        <h3>Building Ecological Pyramids</h3>
        <p>ACTIVITY</p>
        <p>In this activity, students will build biomass pyramids depicting trophic levels of various habitat types using data from trail cameras in Gorongosa National Park. View Activity></p>
      </li>

      <li>
        <img src={require('../images/resources/3_MeasuringBiodiversity_thumb.jpg')} />
        <h3>Measuring Biodiversity in Gorongosa</h3>
        <p>ACTIVITY</p>
        <p>In this activity, students will calculate species richness, evenness, and the Shannon diversity index for various habitat types using data from trail cameras in Gorongosa National Park. View Activity></p>
      </li>
    </ul>

    <h2>Related Resources</h2>
    <ul>
      <li>
        <img src={require('../images/resources/4_TrackingLionRecovery_thumb.jpg')} />
        <h3>Tracking Lion Recovery in Gorongosa National Park</h3>
        <p>SCIENTIST AT WORK VIDEO</p>
        <p>See how scientists in Gorongosa National Park are using GPS satellite collars and motion-sensitive cameras to gather data about the recovery of the park’s lion population. View Resource></p>
      </li>

      <li>
        <img src={require('../images/resources/5_iTunesUCourse_thumb.jpg')} />
        <h3>iTunes U Course: Using Citizen Science to Study Ecology</h3>
        <p>SHORT COURSE</p>
        <p>This iTunes U course teaches concepts in ecology and scientific inquiry through a citizen science project in Gorongosa National Park, Mozambique. View Resource></p>
      </li>

      <li>
        <img src={require('../images/resources/6_GorongosaMap_thumb.jpg')} />
        <h3>Gorongosa National Park Interactive Map</h3>
        <p>INTERACTIVE</p>
        <p>This interactive map of Gorongosa National Park allows users to explore different features of the park, including key components of the conservation strategy. View Resource></p>
      </li>

      <li>
        <img src={require('../images/resources/7_TheGuide_thumb.jpg')} />
        <h3>The Guide: A Biologist in Gorongosa</h3>
        <p>SHORT FILM</p>
        <p>Set against the restoration of war-torn Gorongosa National Park in Mozambique, The Guide tells the story of a young man from the local community who discovers a passion for science after meeting world-renowned biologist E.O. Wilson. View Resource></p>
      </li>

      <li>
        <img src={require('../images/resources/8_GorongosaTimeline_thumb.jpg')} />
        <h3>Gorongosa Timeline </h3>           
        <p>INTERACTIVE</p>
        <p>A highly visual interactive timeline for exploring the history of Gorongosa National Park, from its beginnings as a hunting reserve and decline in the wake of a civil war, to its return to being one of the world’s foremost wildlife treasures and case studies in conservation biology. View Resource></p>
      </li>

      <li>
        <img src={require('../images/resources/9_CreatingChainsWebs_thumb.jpg')} />   
        <h3>Creating Chains and Webs to Model Ecological Relationships</h3>    
        <p>ACTIVITY</p>
        <p>Students use cards to build model food webs and evaluate how ecological disturbances affect each trophic level. View Resource></p>
      </li>

      <li>
        <img src={require('../images/resources/10_ExploringBiomes_thumb.jpg')} />
        <h3>Exploring Biomes in Gorongosa National Park</h3>    
        <p>ACTIVITY</p>
        <p>Gorongosa National Park in Mozambique is a region with high ecological diversity that encompasses two distinct biomes. This activity introduces students to the concept of biomes in conjunction with the Gorongosa National Park interactive map click and learn. View Resource></p>
      </li>

      <li>
        <img src={require('../images/resources/11_SurveyingBiodiversity_thumb.jpg')} />
        <h3>Surveying Gorongosa’s Biodiversity</h3>    
        <p>SCIENTIST AT WORK VIDEO</p> 
        <p>Biologists Piotr Naskrecki and Jennifer Guyton identify and record the diversity of species in Gorongosa National Park’s Cheringoma Plateau. View Resource></p>
      </li>

      <li>
        <img src={require('../images/resources/12_GorongosasWaterCycle_thumb.jpg')} />
        <h3>Gorongosa’s Water Cycle </h3>   
        <p>ANIMATION</p>
        <p>This animation illustrates the main stages of the water cycle in the setting of Gorongosa National Park. View Resource></p>
      </li>
    </ul>


    <p>VIEW ALL RESOURCES> [Button links to Gorongosa collection]</p>
  </div>
);

export {Resources as default}