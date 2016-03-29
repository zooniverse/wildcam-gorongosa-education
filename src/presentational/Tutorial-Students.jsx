const TutorialForStudents = (props) => (
  <div className="admin-component tutorial">
    <h1>Help For Explorers</h1>
    <p>WildCam Lab is a tool for students to download and explore data from the WildCam Gorongosa trail cameras. Your instructor can invite you to join their classroom by sending you a link. You must register for a Zooniverse account to use this resource.</p>

    <h2>Register for a Zooniverse account</h2>
    <ul>
      <li>Go to the Zooniverse home page <a href="https://www.zooniverse.org/">(https://www.zooniverse.org/)</a> and click the register link at the top right.</li>
      <li>Create a user name and password, enter your email address and name, and agree to the privacy policy.</li>
      <li>Click the register button.</li>
    </ul>

    <h2>Enter the WildCam Lab</h2>
    <ul>
      <li>Follow the link that your instructor sent you to join their classroom. Alternatively, go to the main page of the WildCam Lab <a href="https://learn.wildcamgorongosa.org">(https://learn.wildcamgorongosa.org)</a> and click the button for students. </li>
      <li>If you are not yet logged in to Zooniverse, you will be prompted to log in.</li>
    </ul>

    <h2>View your classroom</h2>
    <ul>
      <li>Click the classroom tab to see the list of classrooms that you belong to.</li>
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
    </ul>

  </div>
);

export {TutorialForStudents as default}