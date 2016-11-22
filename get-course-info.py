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
    elif current_field:
      current_course[current_field] = current_course.get(current_field, '') + data

parser = MyHTMLParser()

for line in lines:
  parser.feed(line);
  current_field = ''

# out.write(current_course)