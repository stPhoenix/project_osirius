class BaseModule:
    def __init__(self, langs, categories, dispatch_destination, users, students):
        self.langs = langs
        self.categories = categories
        self.DESTINATIONS = None
        self.setup_destinations()
        self.dispatch_destination = dispatch_destination
        self.users = users
        self.students = students

    def setup_destinations(self):
        self.DESTINATIONS = {
            'Destination name': 'destinatio function',
        }

    def get_destinations(self):
        return self.DESTINATIONS
