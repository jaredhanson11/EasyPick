# EasyPick

EasyPick is an tool to easily search MIT courses based on their ratings from  previous semesters. The app is only available to the MIT community and users  must use their MIT kerberos to login.

## Search
EasyPick allows users to search using multiple filters. It also allows users to sort the results according to their preferences.

## Recommendations
Using the [likely](url=https://www.npmjs.com/package/likely) package, we use colaborative filtering to recommend classes that you might enjoy given how your review your other classes. The more classes you review, the better your recommendations get! Currently only available for course 6 classes.

## Class stats
In each class page you can view statistics about each class. This is computed using both reviews made in EasyPick and course evaluations reviews from the HKN database. You can also check out comments people left about the class.

We currently have two deployments of EasyPick:
- http://walimu-easypick.herokuapp.com/

    all courses listed, all course 6 classes reviews. some database queries might be slow due to the volume of data.

- http://easypick.herokuapp.com/

    only course 6 classes listed, course 6 review since 2014


Famien, Jared, Lara, Subby