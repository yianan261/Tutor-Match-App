# Tutor-Match-App

This is a MERN stack web application that helps students get the academic help they need.
The website is a tutor matching app for students and tutors. The app helps students (users) to match a tutor according to their academic needs. The main collections in the db would be user basic info and classes, the other collection would be the tutor profiles, such as tutor’s academia record and reviews. For more detailed information, please refer to the design documents attached

# Technology used

Node.js and Express.js for backend
<br>
React for frontend
<br>
MongoDB for database
<br>
Passport.js for authentication
<br>
Cloudinary API for image upload
<br>
Multer middleware for handling multi-part
data (for file uploading)
<br>
Observable notebook for mock data
manipulation to get tutor data

# Development usage

1. Run `npm install`
2. Run `npm run dev ` to run in development mode on port 5001
3. Run `npm run initDB` to get tutor data in your local MongoDB
4. Run `npm start` to run the client side React App on port 3000

# Deployment link

https://tutorapp-zwr3.onrender.com/

# Design Document

Design Docs in the DesignDoc file and also [here](https://docs.google.com/document/d/1TX83QjBXnOxksskJH8em_gzH6H0qPJJN0GKg5r-C-mE/edit)

# Design

## Color Palette

Our color palette is inspired by the blackboard, which is a dark green color. The profile page designs has lighter green hue for background. We also have orange and blue tones throughout the website, which are reflected in colors of some buttons and text.

[![Screen-Shot-2022-12-08-at-3-49-23-PM.png](https://i.postimg.cc/jSvj2XW4/Screen-Shot-2022-12-08-at-3-49-23-PM.png)](https://postimg.cc/TKLxHnJK)

## Usability study report

Usability report conducted on 6 participants by Amanda and Yian collectively

Full report [here](https://docs.google.com/document/d/1-BwJbtHX0ZD1FOHyiWaW36SRG15W0IR8cTAHbie6vwo/edit#)

## Changes made to improve accessibility and usability

1. The color contrast for the navbar was increased to ratio of 4.5:1. Originally the tabs that were not active would appear darker, however that did not pass the accessibility validator.

2. Contrast of landing page changed to have the background in a darker gradient to allow the text to pop more
   original:
   ![Landing page](https://i.postimg.cc/59DScCdT/Screen-Shot-2022-11-28-at-3-43-03-PM.png)

   changed: darkend background and improved text visbility
   [![Screen-Shot-2022-12-08-at-4-47-17-PM.png](https://i.postimg.cc/VkLFJzsr/Screen-Shot-2022-12-08-at-4-47-17-PM.png)](https://postimg.cc/WhCZKLkT)

3. The buttons on the main page will appear bigger in size when hovered to let users know they these are focused/hovered, in case color changes are not obvious.

   original navbar contrast:
   ![Search bar](https://i.postimg.cc/R0bnckvy/Screen-Shot-2022-11-28-at-3-43-22-PM.png)

   changed navbar contrast and header to be WCAG compliant: Improved contrast with navbar, and added header
   [![Screen-Shot-2022-12-08-at-8-52-45-PM.png](https://i.postimg.cc/Qd5F1kcW/Screen-Shot-2022-12-08-at-8-52-45-PM.png)](https://postimg.cc/mPLZG9Xb)

4. Search results now show how many there are
   <br>
   before:
   ![Tutor profiles](https://i.postimg.cc/c138nk2k/Screen-Shot-2022-11-28-at-3-43-29-PM.png)

   after: title shows how many search results there are
   [![Screen-Shot-2022-12-09-at-11-18-59-AM.png](https://i.postimg.cc/Sj01wCrH/Screen-Shot-2022-12-09-at-11-18-59-AM.png)](https://postimg.cc/5Q3mzHDm)

5. Card content alignment changed
   <br>
   before: alignment was off and main text was centered
   ![Tutor profiles](https://i.postimg.cc/c138nk2k/Screen-Shot-2022-11-28-at-3-43-29-PM.png)

   after: strong alignment to the left of card
   [![Screen-Shot-2022-12-08-at-9-29-34-PM.png](https://i.postimg.cc/KvyTQ8DW/Screen-Shot-2022-12-08-at-9-29-34-PM.png)](https://postimg.cc/BtMtnsy5)

6. User can view details in "My Schedule"
   Per usability study, some users requested to be able to view details of their booked class. The button colors have also been adjusted to be WCAG compliant
   <br>
   before:
   ![Class schedule](https://i.postimg.cc/L6T5tcTD/Screen-Shot-2022-11-28-at-3-43-46-PM.png)

   after: Modal of class/tutor details added for users
   [![Screen-Shot-2022-12-09-at-12-08-08-AM.png](https://i.postimg.cc/2jKz7BHC/Screen-Shot-2022-12-09-at-12-08-08-AM.png)](https://postimg.cc/gr3FYrF7)

7. User will be asked to double confirm cancellation
   Per usability study, users pointed out users should be given the option to confirm their cancellation of classes when "cancel class" was clicked in "My Schedule"
   <br>
   after: A pop up window will ask users to confirm
   [![Screen-Shot-2022-12-09-at-12-08-45-AM.png](https://i.postimg.cc/7L94GCG8/Screen-Shot-2022-12-09-at-12-08-45-AM.png)](https://postimg.cc/zLy64GF0)
   
8. Sign Up and Login page
   Per usability study, users pointed out that the buttons should be replaced as a login and sign up instead of a "submit" button. Another user also pointed out the "No account" and "Already have an account" should be clickable. <br>
   Changes made to improve accessibility, including increase color contrast of the buttons and the "No account" and "Already have an account" link.<br>
   Before:
   <img width="1374" alt="Screen Shot 2022-11-28 at 3 03 59 PM" src="https://user-images.githubusercontent.com/58647320/204399797-5234684a-7d16-4dce-86d8-1282c50e0dca.png">
<img width="1353" alt="Screen Shot 2022-11-28 at 3 03 48 PM" src="https://user-images.githubusercontent.com/58647320/204399806-8c0b61b5-9e43-422c-8097-c05bd8671973.png">
   After:
   <img width="1882" alt="Screen Shot 2022-12-09 at 8 09 04 PM" src="https://user-images.githubusercontent.com/58647320/206828400-c296ac25-1b87-4efb-8c6f-34ce62925ce4.png">
<img width="1890" alt="Screen Shot 2022-12-09 at 8 08 51 PM" src="https://user-images.githubusercontent.com/58647320/206828402-52131916-5240-47a0-849c-8035de3e0d81.png">


# 60% completion by Nov 15

https://github.com/yianan261/Tutor-Match-App/tree/602a17dd0e83302ea39311b539f68717950999fb

# 80% completion by Nov 22

https://github.com/yianan261/Tutor-Match-App/tree/a0a0bdea6f071ef2d0fe2534192e95a47d190df8

# 100% completion by Nov 28

https://github.com/yianan261/Tutor-Match-App/tree/33143c3ea8d385bf73fc6430d9117fab58d2287f

# Design Mockup

Mockup docs [here](https://www.figma.com/file/xn2avkmMPsgbc284Jr5bZn/Tutor-Web-App?node-id=0%3A1&t=h2xWxAeI8CSOG33x-0)

# Component Diagram

![Tutor App component diagram](https://i.postimg.cc/nVYgwXZZ/Tutor-Match-App-1.png)

# Class Link

https://johnguerra.co/classes/webDevelopment_fall_2022/

# Authors

Yian Chen & So Man Amanda Au-Yeung

# Website images

![Landing page](https://i.postimg.cc/59DScCdT/Screen-Shot-2022-11-28-at-3-43-03-PM.png)
<img width="1374" alt="Screen Shot 2022-11-28 at 3 03 59 PM" src="https://user-images.githubusercontent.com/58647320/204399797-5234684a-7d16-4dce-86d8-1282c50e0dca.png">
<img width="1353" alt="Screen Shot 2022-11-28 at 3 03 48 PM" src="https://user-images.githubusercontent.com/58647320/204399806-8c0b61b5-9e43-422c-8097-c05bd8671973.png">
<img width="1420" alt="Screen Shot 2022-11-28 at 3 11 35 PM" src="https://user-images.githubusercontent.com/58647320/204400133-a0d911c5-815c-4ec3-8d9b-728fd257ced2.png">
![Search bar](https://i.postimg.cc/R0bnckvy/Screen-Shot-2022-11-28-at-3-43-22-PM.png)
![Tutor profiles](https://i.postimg.cc/c138nk2k/Screen-Shot-2022-11-28-at-3-43-29-PM.png)
![User profile](https://i.postimg.cc/SRbRdq3T/Screen-Shot-2022-11-28-at-3-43-39-PM.png)
![Class schedule](https://i.postimg.cc/L6T5tcTD/Screen-Shot-2022-11-28-at-3-43-46-PM.png)
![Class history](https://i.postimg.cc/PqLqkPkV/Screen-Shot-2022-11-28-at-3-43-53-PM.png)
![Price panel](https://i.postimg.cc/wBs9GZhS/Screen-Shot-2022-11-28-at-3-44-01-PM.png)

# Google Slides

https://docs.google.com/presentation/d/1_Ht--i4RtaW4VXUX7TEaVxc8PrCrZrVgcXAEmqJYUpA/edit#slide=id.p

# References

Picture references:
https://unsplash.com/
https://fontawesome.com/icons
https://www.freepik.com/free-photos-vectors/people

- other referenes referred inside code
