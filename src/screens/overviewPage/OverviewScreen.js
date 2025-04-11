import {useState, useEffect} from 'react';
import {StyleSheet,View,Text,ScrollView,TouchableOpacity,Platform,Dimensions} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Card} from '../../components/Card';
import {useThemeColor} from '../../hooks/useThemeColor';
import {BarChart} from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OverviewScreen = () => {
  const [name, setName] = useState('');

  useEffect(() => {
    const getUserData = async () => {
      try {
        const storedName = await AsyncStorage.getItem('name');
        
        if (storedName) {
          setName(storedName);
        }
      } catch (error) {
        console.log('Error retrieving user data from AsyncStorage', error);
      }
    };

    getUserData();
  }, []);

  const {text, primary, background, success, warning, error} = useThemeColor();

  const screenWidth = Dimensions.get('window').width

  const data = {
    labels: ['Jan' , 'Feb' , 'March', 'Apr'],
    datasets:[
      {data: [20000,45000,28000,80000],}
    ]
  }

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0, 
    color: (opacity = 1) => `rgba(98, 0, 238, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    fillShadowGradient: '#6200EE',        
    fillShadowGradientOpacity: 1,  
    style: {
      borderRadius: 16
    }
  };

  return (
    <ScrollView style={[styles.container, {backgroundColor: background}]}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, {color: text}]}>Welcome back,</Text>
          <Text style={[styles.name, {color: text}]}>{name}</Text>
        </View>
        <TouchableOpacity style={[styles.aiButton, {backgroundColor: primary}]}>
          <MaterialCommunityIcons name="robot" size={20} color="white" />
          <Text style={styles.aiButtonText}>AI Assistant</Text>
        </TouchableOpacity>
      </View>

      <Card style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balanceAmount}>₹84,532.00</Text>
        <Text style={[styles.trend, {color: success}]}>
          ↑ 2.3% from last month
        </Text>
        <View style={styles.aiInsightBadge}>
          <MaterialCommunityIcons
            name="trending-up"
            size={16}
            color={success}
          />
          <Text style={[styles.aiInsightText, {color: success}]}>
            Positive cash flow trend detected
          </Text>
        </View>
      </Card>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, {color: text}]}>
            Cash Flow Forecast
          </Text>
          <TouchableOpacity style={styles.moreButton}>
            <Text style={[styles.moreButtonText, {color: primary}]}>
              Details
            </Text>
          </TouchableOpacity>
        </View>

        <Card>
          <View style={{ padding: 16 }}>
            <Text style={{ fontSize: 18, marginBottom: 10, fontWeight: 'bold' }}>Monthly expenses</Text>
            <BarChart
            data={data}
            height={220}
            width={screenWidth}
            chartConfig={chartConfig}
            style={{
              transform: [{scale:0.89}],
              alignSelf: 'center'
             }}
            />
          </View>
          <View
            style={[
              styles.aiAlert,
              {backgroundColor: warning + '20', borderColor: warning},
            ]}>
            <MaterialCommunityIcons
              name="alert-circle"
              size={20}
              color={warning}
            />
            <Text style={[styles.aiAlertText, {color: warning}]}>
              Potential cash flow dip predicted in August. Consider adjusting
              expenses.
            </Text>
          </View>
        </Card>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, {color: text}]}>
          AI Optimization Insights
        </Text>

        <Card style={[styles.insightCard, {borderLeftColor: success}]}>
          <View style={styles.insightHeader}>
            <MaterialCommunityIcons
              name="lightbulb-on"
              size={24}
              color={success}
            />
            <Text style={[styles.insightTitle, {color: success}]}>
              Cost Saving Opportunity
            </Text>
          </View>
          <Text style={styles.insightText}>
            Switch to annual software subscriptions to save ₹2,400/year. 5
            subscriptions identified.
          </Text>
          <TouchableOpacity
            style={[styles.actionButton, {backgroundColor: success}]}>
            <Text style={styles.actionButtonText}>View Details</Text>
          </TouchableOpacity>
        </Card>

        <Card style={[styles.insightCard, {borderLeftColor: primary}]}>
          <View style={styles.insightHeader}>
            <MaterialCommunityIcons
              name="chart-timeline-variant"
              size={24}
              color={primary}
            />
            <Text style={[styles.insightTitle, {color: primary}]}>
              Investment Opportunity
            </Text>
          </View>
          <Text style={styles.insightText}>
            Market conditions favorable for expanding investment portfolio.
            Expected ROI: 12-15%
          </Text>
          <TouchableOpacity
            style={[styles.actionButton, {backgroundColor: primary}]}>
            <Text style={styles.actionButtonText}>Analyze Options</Text>
          </TouchableOpacity>
        </Card>

        <Card style={[styles.insightCard, {borderLeftColor: error}]}>
          <View style={styles.insightHeader}>
            <MaterialCommunityIcons name="alert" size={24} color={error} />
            <Text style={[styles.insightTitle, {color: error}]}>
              Risk Alert
            </Text>
          </View>
          <Text style={styles.insightText}>
            Vendor payment clustering detected. Recommend spreading payments to
            optimize cash flow.
          </Text>
          <TouchableOpacity
            style={[styles.actionButton, {backgroundColor: error}]}>
            <Text style={styles.actionButtonText}>Optimize Schedule</Text>
          </TouchableOpacity>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  header: {
    padding: 24,
    paddingTop: Platform.OS === 'android' ? 40 : 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {fontSize: 16, opacity: 0.8},
  name: {fontSize: 24, fontWeight: 'bold', marginTop: 4},
  aiButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 20,
    gap: 8,
  },
  aiButtonText: {color: 'white', fontWeight: '600'},
  balanceCard: {margin: 24, marginTop: 0},
  balanceLabel: {fontSize: 14, opacity: 0.7, marginBottom: 8},
  balanceAmount: {fontSize: 32, fontWeight: 'bold', marginBottom: 8},
  trend: {fontSize: 14, marginBottom: 12},
  aiInsightBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#00B89420',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  aiInsightText: {fontSize: 14, fontWeight: '500'},
  section: {padding: 24, paddingTop: 0},
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {fontSize: 20, fontWeight: 'bold'},
  moreButton: {padding: 8},
  moreButtonText: {fontSize: 14, fontWeight: '600'},
  aiAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 16,
  },
  aiAlertText: {flex: 1, fontSize: 14, fontWeight: '500'},
  insightCard: {marginBottom: 16, borderLeftWidth: 4, paddingLeft: 12},
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  insightTitle: {fontSize: 16, fontWeight: 'bold'},
  insightText: {fontSize: 14, lineHeight: 20, opacity: 0.8, marginBottom: 12},
  actionButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  actionButtonText: {color: 'white', fontSize: 14, fontWeight: '600'},
});

export default OverviewScreen;
