class Tester(object):
	lister = []
	health = 'good'

a = Tester()
b = Tester()

print a.health
a.health = "perfect"
print a.health
print b.health
print a.lister.append(4)
print b.lister
