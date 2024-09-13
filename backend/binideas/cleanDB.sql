TRUNCATE TABLE 
    "Roles", 
    "Languages", 
    "UserSkills", 
    "Skills", 
    "SkillCategories", 
    "Users"
RESTART IDENTITY CASCADE;


select * from "Roles" r ;
select * from "Languages" l ;
select * from "SkillCategories" sc ;
select * from "Skills" s ;
select * from "Users" u ;
select * from "UserSkills" us ;
select * from "UserRoles" ur;
select * from "UserLanguages" ul;