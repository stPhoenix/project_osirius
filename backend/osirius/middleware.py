from django.utils.timezone import now
from users.models import Student


class SetLastVisitMiddleware(object):
    def __init__(self, get_response):
        self.get_response = get_response
        # One-time configuration and initialization.

    def __call__(self, request):
        # Code to be executed for each request before
        # the view (and later middleware) are called.
        if request.user.is_authenticated:
            request.user.last_visit = now()
            request.user.save()

        response = self.get_response(request)

        return response