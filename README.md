# Report and Feedback Management System

This feature enhances community moderation by allowing users to report inappropriate comments and enabling admins to take necessary actions against these reports. The system ensures transparency and efficiency in handling feedback and moderation tasks.

---

## **Features Overview**

### **For Users:**
- View all comments on a specific post in tabular form.
- Provide feedback using a dropdown menu with predefined options:
  - **Offensive content**
  - **Irrelevant comment**
  - **Spam**
- Report comments based on feedback:
  - **Report button** is disabled by default.
  - Selecting feedback enables the **Report button**.
  - Once clicked, the **Report button** is disabled to prevent duplicate reports.
- View full comment text in a modal by clicking the **Read More** link if the comment exceeds 20 characters.

### **For Admins:**
- Access all reports submitted by users.
- View details of each report:
  - **Comment text**
  - **Email of the commenter**
  - **User feedback**
  - **Report timestamp**
- Take actions against reported comments:
  - **Delete** the comment.
  - **Warn** the user.
  - **Ban** the user.
- Filter and search reports by type (feedback category) or user email.

---

## **User Instructions**

### **Comment Page:**
1. Navigate to the comments page by clicking the **Comment button** on a post.
2. View comments in a table with the following columns:
   - **Email:** Displays the email of the commenter.
   - **Comment:** Shows up to 20 characters of the comment. If the text exceeds this limit, a **Read More** link is provided to view the full text in a modal.
   - **Feedback:** A dropdown menu with three predefined options.
   - **Report Button:** Disabled by default.
3. Select a feedback option to enable the **Report button**.
4. Click the **Report button** to submit your report. The button will be disabled after submission.

### **Admin Dashboard:**
1. Access the admin dashboard to view all reports.
2. Reports are displayed in a table with details:
   - **Comment text**
   - **Commenter email**
   - **Feedback type**
   - **Report timestamp**
3. Use the search and filter options to locate specific reports.
4. Take actions against reported comments:
   - **Delete:** Remove the comment.
   - **Warn:** Send a warning to the commenter.
   - **Ban:** Restrict the user from further interactions.

---

## **Technical Details**

### **Frontend Implementation:**
- **Framework:** React.js
- **State Management:** React Query for data fetching and mutation.
- **UI Components:**
  - **Dropdown Menu:** For feedback selection.
  - **Modal:** To display the full comment text.
  - **Buttons:** Enable/disable logic for reporting and admin actions.

### **API Endpoints:**
- `/comments/postId` - Fetch comments for a specific post.
- `/report/comment` - Submit a report for a comment.
- `/admin/reports` - Fetch all reports for admin review.

### **Backend Requirements:**
- **Endpoints:**
  - Handle comment fetching, report submission, and admin actions.
- **Database:**
  - Store comments, reports, and admin actions.

---

## **UI/UX Design**

### **Comment Page (User View):**
- **Table Layout:**
  - Columns: Email, Comment, Feedback, Report Button.
  - **Read More** link in the comment column for long text.
- **Interaction:**
  - Dropdown enables the report button.
  - Modal displays full comment text.

### **Admin Dashboard:**
- **Table Layout:**
  - Columns: Comment, Email, Feedback, Report Time, Action.
  - Action column includes buttons for delete, warn, and ban.
- **Filter Options:**
  - Filter reports by feedback type or user email.

---

## **Additional Notes**

- **Error Handling:**
  - Notify users of successful or failed report submissions.
  - Handle missing or invalid data gracefully.
- **Accessibility:**
  - Ensure dropdowns and buttons are keyboard-accessible.
- **Hosting:**
  - Ensure the project is deployed online for demonstration.

---

## **Demo and Screenshots**
- Add screenshots of the Comment Page and Admin Dashboard.
- Include a link to the live demo of the project.

---

For further details or questions, please contact the developer.
