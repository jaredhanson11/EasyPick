from HTMLParser import HTMLParser

current_field = ''
current_course = {}

f = open('course6-classes.txt', 'r');
lines = f.read().splitlines()

out = open('courses_commands.js', 'w')
def getClassAttr(attr):
  for a in attr:
    if a[0] == 'class':
      return a[1]

  return None

def write_course():
  global current_course

  out.write('db.courses.insert(' + str(current_course) + ');\n');
  current_course = {}

class MyHTMLParser(HTMLParser):
  def handle_starttag(self, tag, attrs):
    global current_field
    global current_course
    clazz = getClassAttr(attrs)
    if clazz == 'courseblocktitle':
      current_field = 'title'
      if current_course:
        write_course()
    if clazz == 'courseblockdesc':
      current_field = 'description'
    if clazz == 'courseblockhours':
      current_field = 'units'

  def handle_data(self, data):
    global current_field
    global current_course

    if current_field == 'title':
      tks = data.split(' ')
      current_course['course_numbers'] = [tks[0]]
      current_course['name'] = ' '.join(tks[1:])
    if current_field == 'units':
    	if (len(data) > 0):
	    units_list_all = data.split('-')
	    if (len(units_list_all[0]) == 1):
	    	
		if (len(units_list_all[2]) >=7):
			current_course['units'] = data[0:5]
			total_units =  reduce( lambda a, b: int(a) + int(b), units_list_all[0:2] + [units_list_all[2][0:1]])

			if isinstance(total_units, int):
				current_course['total_units'] = total_units
			if (len(units_list_all[2]) > 7):
				current_course['tags'] = [units_list_all[2][9:]]
    	    else:
	    	current_course['units'] = data
    elif current_field:
      current_course[current_field] = current_course.get(current_field, '') + data

parser = MyHTMLParser()

for line in lines:
  parser.feed(line);
  current_field = ''

# out.write(current_course)
