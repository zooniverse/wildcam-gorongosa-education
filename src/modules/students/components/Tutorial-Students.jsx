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
      <li><b>Log into your Zooniverse account</b>, then follow the link that your instructor sent you to join their classroom. Alternatively, go to the main page of the WildCam Lab <a href="https://lab.wildcamgorongosa.org">(https://lab.wildcamgorongosa.org)</a> and click the button for Explorers. </li>
      <li>If you are not yet logged in to Zooniverse, you will be prompted to log in.</li>
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
      <li>If you wish to convert the CSV file to an Excel file (.xls), open the CSV file in Excel and click File>Save as. In the format dropdown, select Excel 97-2004 Workbook (.xls). <b>Important:</b> It is highly recommended that you convert your csv file to Excel format before you begin analyzing data. It is possible that you will lose their work if they begin analyzing data while the file is in CSV format.</li>
      <li>Please note that when viewing the species count for large numbers of animals, the number "25" actually corresponds to the range of "11-50" animals, and the number "75" actually corresponds to the range of "50+" animals. While the research data uses numerical range groups to distinguish large amounts of animals, the downloaded CSV takes the mean values to allow you to use species counts in calculations and graphs.</li>
    </ul>
    
    <h2>Complete an Assignment</h2>
    <ul>
      <li>An assignment allows you identify a set of trail camera images that your teacher has assigned to you. Once they have identified all of your assigned photos, you can download a spreadsheet of your own data. You can also download a spreadsheet of the data based on the public’s identifications of those same images.</li>
      <li>Click on the "Assignments" tab to view a list of your assignments.</li>
      <li>Click the "Start Assignment" button to begin identifying images. You will be redirected to the WildCam Gorongosa site. At the top, you will see the Assignment you are working on and your progress.</li>
      <li>Identify each image to get served a new image. Use the filters to narrow your choices. Click on an animal name to see more photos and learn more. If you don’t know the answer, make your best guess. There is no option to skip a photo. Click on the animal you think it is, answer the questions, and click "Identify". If that is the only species in the photo, click "Done". If there are additional species in the photo, continue identifying. Click "Next Image".</li>
      <li>If an "Already seen" ribbon appears on the top left corner of your photo, you have already identified it but you must identify it again to continue to the next photo.</li>
      <li>When you have completed the required number of images, "Your Done!" appears at the top.</li>
      <li>If you need to stop identifying and come back later, your progress will be saved.</li>
      <li>The data you collected gets compiled every 24 hours, so you must return to your Assignments page the next day to download your data.</li>
      <li>The downloaded file is in CSV (comma separated values) format. Files of this format can be opened in Microsoft Excel by double-clicking the file. If the file does not automatically open in Excel, open Excel, click File&gt;Open, and select the CSV file from your computer.</li>
      <li>If you wish to convert the CSV file to an Excel file (.xls), open the CSV file in Excel and click File&gt;Save as. In the format dropdown, select Excel 97-2004 Workbook (.xls). Important: It is highly recommended that you convert your csv file to Excel format before you begin analyzing data. It is possible that you will lose their work if they begin analyzing data while the file is in CSV format.</li>
    </ul>
    
    <h2>Learn about Gorongosa Ecology</h2>
    <ul>
      <li>Click the "Ecology" tab.</li>
      <li>This page gives a broad overview of the ecology of Gorongosa National Park. The Gorongosa National Park website <a href="http://www.gorongosa.org">(www.gorongosa.org)</a> is another place for you to gather more information about the park.</li>
    </ul>

  </div>
);

export default TutorialForStudents;
