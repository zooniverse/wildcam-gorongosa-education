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
      <li>In the classroom tab, click on the “New” button next to classrooms.</li>
      <li>Create a name for the classroom. This name is required and it will be the name that is displayed in your list of classrooms.</li>
      <li>If the subject of your classroom is different from the classroom name, you may add it in the subject field.</li>
      <li>Optionally, you can add the name of your school and a description of your classroom.</li>
      <li>Click the submit button.</li>
    </ul>

    <h2>Invite students</h2>
    <ul>
      <li>After you create a new classroom, your classroom overview page will appear. Click the “Copy Link” button to copy the link.</li>
      <li>Paste this link in an email to send to your students or post it on a class forum. Instruct students to register for a Zooniverse account before they click on this link.</li>
    </ul>
    
    <h2>View students in your classroom</h2>
    <ul>
      <li>In the classroom tab, click on the classroom you are interested in. </li>
      <li>Click on the “Students” tab to see a list of students who have joined that classroom.</li>
    </ul>

    <h2>Explore trail camera data</h2>
    <ul>
      <li>Click on the “Data” tab.</li>
      <li>On the right, you will see a map with dots, each representing a trail camera. Orange dots represent cameras that have at least one photo that has been completely classified by citizen scientists. Black dots represent cameras that have taken photos, but those photos have not yet been classified. The size of the dots is relative to the number of photos that match your filter criteria.</li>
      <li>Select options on the left to filter the data. Click the “Apply” button at the bottom to update the map.</li>
      <li>When you select multiple species, the map will display all photos that have at least one of the species selected. For example, if you select baboons and impala, this will filter for photos that have either a baboon, an impala, or both.</li>
      <li>To enter a date range, type the dates in this format: YYYY-MM-DD.</li>
    </ul>

    <h2>Download trail camera data</h2>
    <ul>
      <li>If you wish to download a spreadsheet of filtered data, select your filters and click “Apply.” Then click the “Download” button. A pop-up will appear that says “CSV ready!” Click “Download” and a CSV file will be automatically downloaded to your desktop or other destination folder. </li>
      <li>If you wish to export a spreadsheet of the entire trail camera data set, do not apply any filters and simply click on the “Download” button.</li>
      <li>Click “Download” and select the destination folder for the file. Click “Save.”</li>
      <li>The downloaded file is in CSV (comma separated values) format. Files of this format can be opened in Microsoft Excel by double-clicking the file. If the file does not automatically open in Excel, open Excel, click File>Open, and select the CSV file from your computer. </li>
      <li>If you wish to convert the CSV file to an Excel file (.xls), open the CSV file in Excel and click File>Save as. In the format dropdown, select Excel 97-2004 Workbook (.xls).</li>
      <li>You can share data sets that you curate for students, or you can instruct students to explore the map, filter, and download data on their own.</li>
    </ul>

  </div>
);

export {TutorialForTeachers as default}
