AngularJS-Ecommerece-Website
============================
I will try to demonstrate how to use AngularJS to create E-commerce Website using MVC architecture at front end.

A typical E-commerece system has 5 entity objects to hold various data.
1. User
2. Products/Items
3. Cart
4. Order
5. Payment 

These entity objects are accessed by control object and are displayed on boundary objects(Typically web pages).

Keeping same concept in at core  , we can use AngularJS , a very good MVC(W) framework from Google at front-end as well. 

Notes about this project:
1. All data related definitions and sharing of data happens through services(Acting as entity object)
2. Controllers are responsible for accessing and showing data ,and at times manipulating data as per requirement.
3. View(templates) are strictly used for presentation logic and taking user inputs only. They don't have access to data, and don't know the origin of the data.



   