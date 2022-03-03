 Feature: Search

     Scenario: Should search by text
         Given open is on "/client" page
         Then the user sees the movie "фильм хороший"

     Scenario: Should search by text(bad)
         Given open is on "/client" page
         Then the user sees the movie e "фильм хороший"

     Scenario: Should search by text / sad test
         Given open is on "/client" page
         Then the user sees the movie w "Фильм 2"

     Scenario: Should search by text 'Фильм 1'
         Given open is on "/client" page
         Then the user sees the movie q "Фильм 1"
      
     Scenario: Should search by text 'Россия'
         Given open is on "/client" page
         Then the user sees the movie l "Россия" 
