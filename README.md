# Dyscalculia Screening Tool
Dyscalculia Screening Tool is an accessible application developed as part of my senior project (SProj), aimed at helping educators and parents identify early signs of dyscalculia in students. The tool presents age-appropriate questions related to numbers, counting, and basic time and quantity understanding, offering a simple way to observe potential learning difficulties. Although it is not a formal diagnostic instrument, it serves as an important first step in recognizing students who may need further evaluation or support.

![tutorial_short](https://github.com/user-attachments/assets/5138f515-ec3a-4a84-8bcd-87e107e85e75)

#Categories of Student Data and Corresponding Assessment Measures (for ML tasks)

| Category                        | Type of Data Collected                 | Example Measures / Observations                  |
|---------------------------------|--------------------------------------|-------------------------------------------------|
| Demographics                     | Basic student info                    | Age; Grade; School Name; Avg. Score in Math (last 1 year); Avg. Score in Other Subjects (last 1 year) |
| Counting, Approximations & Estimations | Counting (Objects Selection)          | Actual Number – Student Answer                 |
|                                 | Subitizing (Quantity Identification) | Actual Number – Student Answer                 |
|                                 | Magnitude (Quantity Comparison)      | 1 = Correct Response; 0 = Incorrect Response  |
|                                 | Symbolic Transcoding (Number Identification) | 1 = Correct Response; 0 = Incorrect Response  |
|                                 | Place Value (Number Comparison)      | 1 = Correct Response; 0 = Incorrect Response  |
|                                 | Number Line Placement                | 1 = Correct Response; 0 = Incorrect Response  |
|                                 | Backward Counting                    | 1 = Correct Response; 0 = Incorrect Response  |
|                                 | Response Time                        | Activity End Time – Activity Start Time       |
| Arithmetic Operations & Fractions | Addition (Word Problems)             | Correct Answer – Student Answer               |
|                                 | Subtraction (Word Problems)           | Correct Answer – Student Answer               |
|                                 | Identification of Fractions           | 1 = Correct Response; 0 = Incorrect Response  |
|                                 | Response Time                        | Activity End Time – Activity Start Time       |
| Concept of Time & Money          | Reading Time                          | 1 = Correct Response; 0 = Incorrect Response  |
|                                 | Identifying Money Value               | 1 = Correct Response; 0 = Incorrect Response  |
|                                 | Awareness of Time                     | 1 = Correct Response; 0 = Incorrect Response  |
|                                 | Response Time                         | Activity End Time – Activity Start Time       |
| Student Feedback                 | How much did the student enjoy the activity | Likert Scale (A lot to Not at all)            |
|                                 | How is the student feeling           | Likert Scale (Positive to Anxious & Frustrated) |
| Health & Family Background       | Pre-mature Birth                      | 1 = Yes; 0 = No                               |
|                                 | Any Birth Defects                     | 1 = Yes; 0 = No                               |
|                                 | Low Birth Weight (<= 3lbs)           | 1 = Yes; 0 = No                               |
|                                 | Family History of SLD                 | 1 = Yes; 0 = No                               |
| Outcome Label                    | Dyscalculia Risk                      | 1 = Yes; 0 = No                               |
