<template>
    <div class="about-us">
      <div class="container">
        <h1>About Us</h1>
        <p>Welcome to [Company Name]! We are a team of passionate individuals dedicated to [Company Mission].</p>
        <div class="row">
          <div class="col-md-6">
            <h3>Our Story</h3>
            <p>[Write a short paragraph about your company's history and journey.]</p>
          </div>
          <div class="col-md-6">
            <h3>Our Values</h3>
            <ul>
              <li>[Value 1]</li>
              <li>[Value 2]</li>
              <li>[Value 3]</li>
            </ul>
          </div>
        </div>
        <div class="team">
          <h2>Meet the Team</h2>
          <template v-for="member in teamMembers" :key="member.id">
            <div class="team-member">
              <img :src="member.picture" alt="Team Member - [Member Name]">
              <h3>{{ member.name }}</h3>
              <p>{{ member.title }}</p>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="container" data-mdb-perfect-scrollbar="true"></div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        teamMembers: [
          {
            id: 1,
            name: "John Doe",
            title: "CEO",
            picture: "images/team/john_doe.jpg"
          },
          {
            id: 2,
            name: "Jane Smith",
            title: "Developer",
            picture: "images/team/jane_smith.jpg"
          },
          // Add more team members here
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  .about-us {
    padding: 50px 0;
  }
  
  .team-member {
    text-align: center;
    margin-bottom: 20px;
  }
  </style>
  