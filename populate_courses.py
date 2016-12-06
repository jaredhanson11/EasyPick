mport re
import json
import os
# Setup mongodb
from pymongo import MongoClient
client = MongoClient('mongodb://localhost:27017/')
db = client.easypick
courses = db.courses

# Get course info
import requests
client_id = '324ab1e57f0d4abd968ed4f04b631513'
client_secret = 'ae0369964f584b8cBE5CCDB57B62D487'

def get_classes_by_dept(dept_string):
    headers = {'Accept': 'application/json', 'client_id': client_id, 'client_secret': client_secret}

        ret = []
	    for term_string in ['2016FA', '2016JA', '2017SP']:
	            url = 'https://mit-public.cloudhub.io/coursecatalog/v2/terms/' + term_string + '/subjects?dept=' + str(dept_string)
		            resp = requests.get(url, headers=headers)
			            content = resp.json()
				            ret.extend(content['items'])

					        return ret

						def populate_courses(courses_list):
						    '''
						        Example course:

							    u'academicYear': u'2016',
							        u'cluster': u'(Same subject as 2.797J, 3.053J, 20.310J)',
								    u'description': u'See description under subject 20.310J.',
								        u'instructors': u'M. Bathe, A. J. Grodzinsky',
									    u'optional': None,
									        u'prerequisites': u'2.370 or 2.772J; 18.03 or 3.016; Biology (GIR)',
										    u'subjectId': u'6.024',
										        u'termCode': u'2016FA',
											    u'title': u'Molecular, Cellular, and Tissue Biomechanics',
											        u'units': u'4-0-8'

												    u'academicYear': u'2016',
												        u'cluster': u'(Same subject as 20.345J)',
													    u'description': u'See description under subject 20.345J.',
													        u'instructors': u'P. So, J. Bagnall, S. F. Nagle,  S. Wasserman',
														    u'optional': None,
														        u'prerequisites': u'Biology (GIR), and 2.004 or 6.003; or 20.309; or permission of instructor',
															    u'subjectId': u'6.123',
															        u'termCode': u'2016FA',
																    u'title': u'Bioinstrumentation Project Lab',
																        u'units': u'2-7-3'
																	    '''
																	        inserted_count = 0
																		    for course in courses_list:
																		            try:
																			                units = re.match(r'[0-9]-[0-9]-[0-9]', course['units']).group(0)
																					            total_units = reduce(lambda x, y: int(x) + int(y), units.split('-'), 0)
																						                department = int(course['subjectId'].split('.')[0])
																								            new_course = {
																									                        'name': course['title'],
																												                    'course_numbers': [course['subjectId']],
																														                        'department': department,
																																	                    'description': course['description'],
																																			                        'units': units,
																																						                    'total_units': total_units,
																																								                        'prereqs': course['prerequisites']
																																											                }
																																													            courses.insert_one(new_course)
																																														                inserted_count += 1
																																																        except Exception, e:
																																																	            print course
																																																		                print e
																																																				    return inserted_count

																																																				    def main():
																																																				        while True:
																																																					        y_or_n = str(raw_input('Drop existing courses db? y/n \t\t')).lower()
																																																						        if y_or_n == 'y':
																																																							            db.drop_collection(courses)
																																																								                break
																																																										        elif y_or_n == 'n':
																																																											            break

																																																												        if os.path.exists('courses_list.json'):
																																																													        courses_list = json.load(open('courses_list.json'))
																																																														    else:
																																																														            courses_list = []
																																																															            added_courses = {}
																																																																            for dept in range(0,24):
																																																																	                print 'Getting course ' + str(dept) + ' classes.'
																																																																			            classes = get_classes_by_dept(dept)
																																																																				                def add_if_not_added(x):
																																																																						                if x['subjectId'] not in added_courses:
																																																																								                    courses_list.append(x)
																																																																										                        added_courses[x['subjectId']] = True
																																																																													            map(add_if_not_added, classes)
																																																																														                print 'Retrieved ' + str(len(classes)) + ' courses.'
																																																																																        f = open('courses_list.json', 'w')
																																																																																	        json.dump(courses_list, f)

																																																																																		    populated_count = populate_courses(courses_list)
																																																																																		        print 'Populated ' + str(populated_count) + ' total courses.'

																																																																																			if __name__ == '__main__':
																																																																																			    main()

