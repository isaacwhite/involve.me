from django.conf.urls import url, include
from rest_framework import routers, serializers, viewsets, generics
from src.models import MatchRel, Match, Action, Organization

from . import views

class MatchSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Match
        fields = ('match_id','match')

class OrganizationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Organization
        fields = ('name','url','location','text','rating')

class ActionSerializer(serializers.HyperlinkedModelSerializer):
    
    organization = OrganizationSerializer()
    
    class Meta:
        model = Action
        fields = ('text','learn_more','donate_url','volunteer_url','organization')

class MatchRelSerializer(serializers.HyperlinkedModelSerializer):
    
    match = MatchSerializer()
    action = ActionSerializer()
    
    class Meta:
        model = MatchRel
        fields = ('matchrel_id','match','action')


class MatchRelViewSet(viewsets.ModelViewSet):
    serializer_class = MatchRelSerializer
    
    def get_queryset(self):
    	print self.request.query_params.get('matches', None)
    	
    	queryset = MatchRel.objects.all()
    	
    	matchstring = self.request.query_params.get('matches', None)
    	
    	if matchstring is not None and '' != matchstring:
			
			print 'thing'
			
			if ',' in matchstring:
				matches = matchstring.split(',')
			else:
				matches = [matchstring]
			
			print matches
			
			queryset = queryset.filter(match__match__in=matches,approved=True)
			
			print queryset
    	
    	return queryset
    

class MatchViewSet(viewsets.ModelViewSet):
    queryset = Match.objects.all()
    serializer_class = MatchSerializer

router = routers.DefaultRouter()
router.register(r'matchquery', MatchRelViewSet,base_name="match")
router.register(r'matches', MatchViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
]
