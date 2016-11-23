# Meeting 0 - Minutes

## MVP discussion
Discuss current plan for MVP and progress so far.
- What we plan to include
  * Users can review classes, see class pages with basic info, do basic search.

- What we left out
  * Getting course evaluations data, wishlist, more complex algorithms for suggestions,, login with certificates, add more complex search features.

- Progress so far

TA Feedback: Our MVP seems to have a lot of functionality implementation, given
that, we decided to update the Team Plan and move some of the tasks out of the
MVP. That way our MVP is mostly a skeleton that provides some basic functionality.
https://docs.google.com/spreadsheets/d/1RZ_jwDfGO1xGVqVDRRCeube7lSI-Zu8SjHr6Gb3akKw/edit?usp=sharing

## Acquiring data

Discuss what is the best way to get access to course information data.

- Warehouse: need to wait until they give us access

- Scraping the website: we haven't done it before, so it might takes us some time.

TA feedback: basic data is fine for the MVP as long as we have the data by the
final deadline. we should consider using HKN dumps of course evaluations for
course 6 classes.

## Address feedback from pitch

Discuss some of the points brought up in the feedback from the pitch and present our proposed solutions.

TA feedback: We addressed some of the concerns regarding the feedback. Probably
the most important one is that we should stay away from using certificates, and
try to find another way of validating kerberos (maybe using the people directory?).

## General questions about code/design

If we have spare time, we wanted to asks some general questions we had about our code base.
- Server being completely API based, how do we handle certain requests that need an userid?

TA feedback: So far, it seems like the way we are structuring our code is approapriate
and doing PR's is good for code quality.
