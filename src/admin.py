from django.contrib import admin
from .models import Organization, Match, Action, MatchRel

@admin.register(Organization,Match,Action,MatchRel)
class OrgizationAdmin(admin.ModelAdmin):
    pass

class MatchAdmin(admin.ModelAdmin):
    pass

class ActionAdmin(admin.ModelAdmin):
    pass
