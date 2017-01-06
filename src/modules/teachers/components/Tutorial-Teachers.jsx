const TutorialForTeachers = (props) => (
  <div className="admin-component tutorial">
    <h1>Help For Educators</h1>
    <p>WildCam Lab is a tool for students to download and explore data from the WildCam Gorongosa trail cameras. As an educator, you can set up private classrooms, invite students to join your classrooms, and filter and download data sets. All users (educators and students) must register for a Zooniverse account to use this resource.</p>

    <h2>Register for a Zooniverse account</h2>
    <ul>
      <li>Go to the Zooniverse home page <a href="https://www.zooniverse.org/">(https://www.zooniverse.org/)</a> and click the register link at the top right.</li>
      <li>Create a user name and password, enter your email address and name, and agree to the privacy policy.</li>
      <li>Click the register button.</li>
    </ul>

    <h2>Enter the WildCam Lab</h2>
    <ul>
      <li>From the main page of the WildCam Lab <a href="https://lab.wildcamgorongosa.org">(https://lab.wildcamgorongosa.org)</a>, click the button for educators. </li>
      <li>If you are not yet logged in to Zooniverse, you will be prompted to log in.</li>
    </ul>

    <h2>Set up a classroom</h2>
    <ul>      
      <li>In the classroom tab, click on the "Register" button next to classrooms.</li>
      <li>Fill out the short form about you. You only have to do this once.</li>
      <li>Click the "New" button next to classrooms.</li>
      <li>Create a name for the classroom. This name is required and it will be the name that is displayed in your list of classrooms.</li>
      <li>If the subject of your classroom is different from the classroom name, you may add it in the subject field.</li>
      <li>Optionally, you can add the name of your school and a description of your classroom.</li>
      <li>Click the submit button.</li>
    </ul>

    <h2>Invite students</h2>
    <ul>
      <li>After you create a new classroom, your classroom overview page will appear. Click the "Copy Link" button to copy the link.</li>
      <li>Paste this link in an email to send to your students or post it on a class forum. <b>Important:</b> Students must create a <a href="https://www.zooniverse.org/">Zooniverse account</a> first and be signed into their account <b>before</b> they click on this link.</li>
    </ul>

    <h2>View students in your classroom</h2>
    <ul>
      <li>In the classroom tab, click on the classroom you are interested in.</li>
      <li>Click on the "Students" tab to see a list of students who have joined that classroom.</li>
      <li>Next to each student name, you will also see the total number of photo identifications the student has done on WildCam Gorongosa to-date.</li>
    </ul>

    <h2>Explore trail camera data</h2>
    <ul>
      <li>Click on the "Data" tab.</li>
      <li>On the right, you will see a map with dots, each representing a trail camera. Orange dots represent cameras that have at least one photo that has been completely classified by citizen scientists. Black dots represent cameras that have taken photos, but those photos have not yet been classified. The size of the dots is relative to the number of photos that match your filter criteria.</li>
      <li>Click on any orange dot to see a random preview of photos from that camera.</li>
      <li>Click the "View Filters" button to see the filter options. As you select filters, the data will automatically filter and you can see the results on the map.</li>
      <li>Any categories that have no filters selected will show all photos (e.g. if you want to show cameras from all habitats, you do not need to select any habitat filters).</li>
      <li>When you select multiple species, the map will display all photos that have at least one of the species selected. For example, if you select baboons and impala, this will filter for photos that have either a baboon, an impala, or both.</li>
    </ul>

    <h2>Download trail camera data</h2>
    <ul>
      <li>If you wish to download a spreadsheet of filtered data, select your filters and click the "Download" button.</li>
      <li>If you wish to export a spreadsheet of the entire trail camera data set, do not apply any filters and simply click on the "Download" button.</li>
      <li>Select the destination folder for the file. Click "Save."</li>
      <li>The downloaded file is in CSV (comma separated values) format. Files of this format can be opened in Microsoft Excel by double-clicking the file. If the file does not automatically open in Excel, open Excel, click File>Open, and select the CSV file from your computer. </li>
      <li>If you wish to convert the CSV file to an Excel file (.xls), open the CSV file in Excel and click File &gt; Save As. In the format dropdown, select Excel 97-2004 Workbook (.xls). <b>Important:</b> It is highly recommended that your students convert their csv files to Excel format before they begin analyzing data. It is possible that they will lose their work if they begin analyzing data while the file is in CSV format.</li>
      <li>You can share data sets that you curate for students, or you can instruct students to explore the map, filter, and download data on their own.</li>
      <li>Please note that when viewing the species count for large numbers of animals, the number "25" actually corresponds to the range of "11-50" animals, and the number "75" actually corresponds to the range of "50+" animals. While the research data uses numerical range groups to distinguish large amounts of animals, the downloaded CSV takes the mean values to allow you to use species counts in calculations and graphs.</li>
    </ul>
    

    <h2>Create an Assignment</h2>
    <ul>
      <li>An assignment allows you to filter a set of trail camera photos and assign them to your students to identify. Once they have identified all of their assigned photos, students can download a spreadsheet of their own data. They can also download a spreadsheet of the data based on the public’s identifications of those same images to compare "answers".</li>
      <li>To create an assignment, you must first have a classroom set up with students joined. Enter a classroom and click the "Assignments" tab. Click the "New Assignment" button.</li>
      <li>Enter a name, description, and due date for the assignment (your students will see this). </li>
      <li>Choose the number of images that you want each student to identify. </li>
      <li>Select the students you want to send this assignment to. You may choose to send the assignment to all students in your class, or you may choose to send an assignment to a group of students and create a different assignment for a different group.</li>
      <li>Click the "Select Images" button and you will be redirected to the map.</li>
      <li>On the map, filter the full set of images based on the criteria you are interested in for your assignment. Alternatively, if your assignment does not require you to narrow down the types of images, don’t select any filters.</li>
      <li>Click the "Select for Assignment" button.</li>
      <li>A popup will appear showing how many images matched your filters. The images your students will be asked to identify will be randomly selected from this set. From here, you have two options depending on your goals for the assignment: 1) Change the number of subject images to match the number of images you assigned for each student. If you do this, then every student will get the exact same images in their assignment. 2) Leave the number of subject images as is. If you do this, then the images for each student will be randomly chosen from this set. The likelihood of students getting different images increases the larger this number is.</li>
      <li>Click the "Confirm selection" button.</li>
      <li>You will see a preview of 10 images from the set you filtered. If you made a mistake and need to select different images, click the "Select new images" button. Otherwise, click the "Submit" button.</li>
      <li>After the processing is complete, a popup will appear indicating that your new assignment has been created. Click "Ok".</li>
      <li>This assignment will automatically appear in your student’s assignments tab. They will not get an email notification, so you must alert them of this new assignment. From the assignments tab, your students can click "Start Assignment" to begin identifying images. They can click "My Data" to download a CSV file of their identification data. Note: the data currently gets compiled every 24 hours, so your students must wait until the next day to download their data. Your students can also click the "Public Data" button to download a CSV file of the identifications done by the public.</li>
    </ul>

    <h2>Manage Assignments</h2>
    <ul>
      <li>To view or edit an existing assignment, go to the Assignments tab within your classroom and click "View/Edit".</li>
      <li>To see the students’ progress on their assignment, click "View Edit" and the list of students will show the number of images each student has identified / the total number of images assigned.</li>
      <li>To delete an assignment, click the "Remove" button.</li>
    </ul>

    <h2>Browse Classroom Resources</h2>
    <ul>
      <li>Click the "Resources" tab.</li>
      <li>The Resource page contains links to classroom-ready activities developed by HHMI BioInteractive. </li>
      <li>The "WildCam Lab Activities" section includes activities that guide you through using the WildCam Lab to teach inquiry-based ecology concepts. </li>
      <li>The "Related Resources" section includes selected resources that provide students with background information about Gorongosa ecology.</li>
      <li>By clicking the "View" links next to each resource, you will be redirected to the HHMI BioInteractive website where you can read more and download materials.</li>
      <li>Click the "Explore all resources" button at the bottom of the page to view the entire set of Gorongosa resources on HHMI BioInteractive.</li>
    </ul>

    <h2>Learn about Gorongosa Ecology</h2>
    <ul>
      <li>Click the "Ecology" tab. </li>
      <li>This page gives a broad overview of the ecology of Gorongosa National Park. Students also have access to this page. Plan your assignments with this as a resource for students to gather background information. </li>
      <li>The "Resources" tab is another good place for background information on Gorongosa, including videos, animations, and interactives.</li>
      <li>The Gorongosa National Park website (www.gorongosa.org) is another place for students to gather more information about the park.</li>
    </ul>

  </div>
);

export default TutorialForTeachers;
