from __future__ import unicode_literals

from datetime import datetime
from django.db import models
from django.contrib.postgres.fields import JSONField
from django.contrib.auth.models import User

class Organization(models.Model):
    org_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    url = models.URLField()
    location = models.CharField(max_length=200)
    text = models.TextField()
    rating = models.IntegerField(default=-1,choices=((-1,'No rating available'),(0,0),(1,1),(2,2),(3,3),(4,4),(5,5)))
    
    def __str__(self):
        return self.name

class Match(models.Model):
    match_id = models.AutoField(primary_key=True)
    match = models.CharField(max_length=40,unique=True)
    
    def __str__(self):
        return self.match

class Action(models.Model):
    action_id = models.AutoField(primary_key=True)
    text = models.TextField()
    learn_more = models.URLField(blank=True)
    donate_url = models.URLField(blank=True)
    volunteer_url = models.URLField(blank=True)
    organization = models.ForeignKey(Organization)
    
    def __str__(self):
        return self.organization.name + ": " + self.text

class MatchRel(models.Model):
    matchrel_id = models.AutoField(primary_key=True)
    match = models.ForeignKey(Match)
    action = models.ForeignKey(Action)
    approved = models.BooleanField(default=False)
    
    def __str_(self):
    	return self.action.organization.name + self.match.match

class UserHistory(models.Model):
	matches = models.ManyToManyField(MatchRel)
	url = models.URLField(max_length=1000)
	datetime = models.DateTimeField(auto_now_add=True)
	user = models.ForeignKey(User)