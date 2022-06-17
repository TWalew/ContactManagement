# ContactManagement
 Contact management system task for Invelop
 
 Hey, guys wellcome to my application. =)

 To run the app you'll need to do some initial setup first.

 We can start with the database:

 1. You need to have SQL Server Management Studio or some other server studio depending on what database you want to       use. Keep in mind if using other database you'll also need to change the connection string.
 
  1.1 If you want to stick with SQL Server you can open SSMS start server at localhost using ``` . ``` as the name and run the first query to create the database:
 ```diff
 Create Database ContactDB
```
  1.2 Open the newly created database and run the second query to create the table:
 ```diff
 Create table dbo.Contacts( ContactID int identity(1,1) NOT NULL, FirstName
  varchar(500), Surname varchar(500), DateOfBirth date, PhoneNumber varchar(15),
  IBAN varchar(35), PRIMARY KEY (ContactId) )
```
  1.3 Finally you need to run a query to add the first contact. This step is optional you can also add it trough the         FE.
 ```diff
insert into dbo.Contacts values ('Toni', 'Valev', '1996-02-24','Stara Zagora,
  Avgusta Trajana 55', '0876876636', 'DE89370400440532013000')
```
