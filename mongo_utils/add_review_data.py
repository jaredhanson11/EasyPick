import math
import random

import copy
from pymongo import MongoClient
client = MongoClient('mongodb://localhost:27017/')
db = client.easypick
courses = db.courses
reviews = db.reviews



hkn = open('underground-guide-subjects.psql')
hkn_lines = hkn.readlines()

def get_info(line):
    line_spl = line.split('\t')
    #when responses are 0
    if line_spl[13] in ['0', '\N'] or line_spl[9] in ['0', '\N']:
        return {}
    try:
        ret = {
            'course_number': str(line_spl[3]),
            'year': int(line_spl[7]),
            'class_hrs': float(line_spl[9]),
            'outside_hrs': float(line_spl[10]) + float(line_spl[11]),
            'content_difficulty': float(line_spl[15]),
            'grading_difficulty': float(line_spl[15]),
            'overall_satisfaction': float(line_spl[16]),
            'num_responses': int(line_spl[13])
            }
    except:
        return {}
    term_conversion = {'iap': 1, 'spring': 2, 'summer': 3, 'fall': 4}
    if str(line_spl[6]).lower() in term_conversion:
        ret['term'] = term_conversion[str(line_spl[6]).lower()]
    else:
        print 'error, invalid term.' + line_spl[6]

    return ret

blacklisted_lines = [59, 120]

def populate_db():
    for i, line in enumerate(hkn_lines[18:1800]):
        #(['id', 'last_updated', 'last_updated_by', 'number', 'level', 'name', 'term_season', 'term_year', 'slogan', 'class_hours', 'lab_hours', 'prep_hours', 'prereqs', 'num_responses', 'num_students', 'diff_rating', 'overall_rating', 'lec_comments'])
        if i in blacklisted_lines:
            continue
        offering = get_info(line)
        if offering == {}:
            continue
        if offering['year'] < 2014:
            continue
        course_num = offering.pop('course_number')
        num_reviews = offering.pop('num_responses')
        if '/' in course_num:
            course_nums = map(lambda x: x[:-1], course_num.split('/'))
        else:
            course_nums = [course_num]

        for course_num in course_nums:
            offering['course_numbers'] = course_num
            for i, (mi, ma) in enumerate([(0,4.5), (4.5,6.5), (6.5,8.0), (8.0,10.25), (10.25, 12.5), (12.5, 15), (15, 1000000)]):
                if offering['outside_hrs'] >= mi and offering['outside_hrs'] < ma:
                    offering['outside_hrs'] = i
            for i, (mi, ma) in enumerate([(0,1.7), (1.7,2.5), (2.5,3.2), (3.2,4), (4, 5), (5, 6.2), (6.2, 1000000)]):
                if offering['class_hrs'] >= mi and offering['class_hrs'] < ma:
                    offering['class_hrs'] = i

            course = courses.find_one({'course_numbers': course_num})
            if course:
                course_id = course['_id']
                offering['course'] = course_id
                x = random.randint(0,1000)
                for i in range(x, x+num_reviews):
                    offering['_id'] = str(offering['year']) + '-' + str(offering['term']) + '-' + offering['course_numbers'] + '-' + str(i) + str(random.randint(0,1199999))
                    db.reviews.insert_one(offering)









def stats():

    '''
    stats of dataset:
    class_hrs mean: 3.62463538364, std_dev: 1.06875980608
    outside_hrs mean: 9.53603134342, std_dev: 4.98605963659
    '''
    class_hrs_list = []
    outside_hrs_list = []
    db = populate_db()
    for course in db:
        for rev in db[course]:
            for i in range(rev['num_responses']):
                if rev['outside_hrs'] > 80:
                    continue
                class_hrs_list.append(rev['class_hrs'])
                outside_hrs_list.append(rev['outside_hrs'])
    print '===='
    for mi, ma in [(0,4.5), (4.5,6.5), (6.5,8.0), (8.0,10.25), (10.25, 12.5), (12.5, 15), (15, 1000000)]:
        print len(filter(lambda x: x >= mi and x < ma, outside_hrs_list))
    print '===='
    print '===='
    for mi, ma in [(0,1.7), (1.7,2.5), (2.5,3.2), (3.2,4), (4, 5), (5, 6.2), (6.2, 1000000)]:
        print len(filter(lambda x: x >= mi and x < ma, class_hrs_list))
    print '===='
    import numpy
    print numpy.std(class_hrs_list)
    print numpy.std(outside_hrs_list)
    print numpy.mean(class_hrs_list)
    print numpy.mean(outside_hrs_list)
    print numpy.median(class_hrs_list)
    print numpy.median(outside_hrs_list)
    return


populate_db()


