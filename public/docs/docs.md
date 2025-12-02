
# **Fydme – Your All-in-One Portfolio Manager**

Fydme is a full-stack portfolio management platform.



## **Features**

*  **Dynamic Graphs & Charts** for daily/weekly portfolio metrics.
*  **Real-Time Numeric Metrics** updating from the backend.
*  **MongoDB Database** integration for storing portfolio data.
*  **Full-Stack Next.js Approach** (API routes + frontend in one

```
➜  findme git:(develop) ✗ tree

├── packages
│   └── ui
│       ├── loading.tsx
│       └── navbar.tsx

├── src
│   ├── app
│   │   ├── api
│   │   │   ├── dashboard
│   │   │   │   └── route.tsx
│   │   │   └── members
│   │   │       └── route.ts
│   │   ├── (dashboard)
│   │   │   ├── admin-dashboard
│   │   │   │   └── page.tsx
│   │   │   ├── admin-tools
│   │   │   │   └── page.tsx
│   │   │   ├── feedback
│   │   │   │   └── page.tsx
│   │   │   ├── performance-metric
│   │   │   │   └── page.tsx
│   │   │   ├── traffic-report
│   │   │   │   └── page.tsx
│   │   │   ├── settings
│   │   │   │   └── page.tsx
│   │   │   └── user-management
│   │   │       └── page.tsx
│   │   ├── docs
│   │   │   ├── docs.md
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components
│   │   ├── admin
│   │   │   ├── chartCard.tsx
│   │   │   ├── chloropethMap.tsx
│   │   │   ├── engagementCard.tsx
│   │   │   ├── overview.tsx
│   │   │   ├── portflioDonut.tsx
│   │   │   ├── rocketCard.tsx
│   │   │   ├── socialMedia.tsx
│   │   │   ├── statCard.tsx
│   │   │   ├── trafficCard.tsx
│   │   │   ├── trafficDashboard.tsx
│   │   │   └── userBar.tsx
│   │   ├── feedback
│   │   │   ├── allFeedback.tsx
│   │   │   ├── feedbackFilter.tsx
│   │   │   ├── supportTicket
│   │   │   │   ├── allTicket.tsx
│   │   │   │   └── ticketFilter.tsx
│   │   │   └── userFeedback.tsx
│   │   ├── settings
│   │   │   ├── adminInfo.tsx
│   │   │   ├── adminMemberList.tsx
│   │   │   ├── ProfilePictureModal.tsx
│   │   │   ├── teamInfo.tsx
│   │   │   └── teamMembersList.tsx
│   │   ├── sidebar.tsx
│   │   └── usermanagement
│   │       ├── CustomMemberTable.tsx
│   │       └── FilterPanel.tsx
│   │
│   ├── types.ts
│   └── upload
│       └── page.tsx
```

#### Settings Page
- [ ] Add Admin Member
  - [x] Upload Picture Add Member `Edit member details form`

- [x] List of Admin Members
  - [x] Showing Admin List Table Contains All info `Edit Add or Rest Password`
  - [x] Dynamic Overview of the Individual Admin with all Info `Status Edit option`
- [ ] Team Info
   - [x] Upload Picture Add Member `Edit member details form`
- [x] List of Team Members
    - [x] Showing Admin List Table Contains All info `Edit Add or Rest Password`
  - [x] Dynamic Overview of the Individual Admin with all Info `Status Edit option`
- [ ] Verificaion Info
    - [x] Requeset Verification Table of users from Mvp 1
    - [ ] Filter Functionality `expand and mini`
    - [ ] Dynamic Overview of the User Rquest with open Docs

#### User Feedback
- [x] User Feedback
  - [x] List of User Feedback All info details table
  - [x] Filter Funcnality by `user id status`
  - [x] expand and Minimize tables
  - [x] Dynamic Overview of the Individual Admin with all Info `Status Edit option`
- [x] Support Ticket
  - [x] List of Support Tickets  All info details table
  - [x] Three Inner Page `All Tickets` `New Tickets` `Past Tickets`
  - [x] Filer Fucnality `username Ticket ID and Status`
  - [x] Dynamic Overview of Specific User Ticket with `Edit Options`
  - [x] Dynaimic Comments Updates from the Admins

#### Performance Metrics
- [x] User Overview Cards with Info
- [ ] User Info Card Graph remodel
- [x] App performance
- [x] System Health
- [x] Server usage Bar Graphs
- Need Tailwind Adjustments

#### Admin Tools
- [x] Overview
- [ ] User Verication
  - [x] Request Pending and Request Completed Tables
  - [ ] Expands
- [ ] Promotions Mangement
    - [x] Cards
    - [x] Performance Summary Table
    - [ ] Expands and Filters
- [ ] Advertisement Cards
- [ ] Visit / Site clicks Graphs

#### User Mangement and Profile Analytics
- [x] Profile Database with all info with `@Backend`
- [x] Table Pagination
- [x] Filter Functionality with `Username Verifyinfo Subscription Location Size NumberofPortfolio`
- [x] Expand and Collapse Buttons with dual Side
- [ ] Onclick Portfolio Cards

#### Admin Dashboard
- [ ] Overview
    - [x] Users Cards , Traffic  Location Graphs - view more report , user Created Portfolio Graphs `With Dynamic Filter Funcnatlity Daily Weekly Montly Till date`  `@Backend`
    - [ ] User Data and Engaement Graphs
        - [x] Filters Models and Graphs
        - [ ] Graphs Filter Realations and Graph remodel
    - [ ] Marketing
      - [x] Marketing Cards
      - [ ] Filters
    - [ ] Socila Media
      - [x] Filters and Graphs
      - [ ] Graphs Filter Realations and Graph remodel


