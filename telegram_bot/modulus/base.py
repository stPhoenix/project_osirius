class BaseModule:
    def __init__(self, **kwargs):
        self.langs = kwargs['langs']
        self.DESTINATIONS = None
        self.setup_destinations()
        self.dispatch_destination = kwargs['dispatch_destination']
        self.users = kwargs['users']
        self.students = kwargs['students']
        self.menu_text = kwargs['menu_text']

    def setup_destinations(self):
        self.DESTINATIONS = {
            'Destination name': 'destinatio function',
        }

    def get_destinations(self):
        return self.DESTINATIONS
