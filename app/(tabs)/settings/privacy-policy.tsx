import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

const privacySections = [
  {
    id: 'introduction',
    title: '1. Introduction',
    content: `This Privacy Policy explains how Expense Tracker ("we," "our," or "us") collects, uses, and protects your personal information when you use our mobile application and related services.

We are committed to protecting your privacy and ensuring the security of your personal information. This policy describes our practices regarding the collection, use, and disclosure of information through our app.`
  },
  {
    id: 'information',
    title: '2. Information We Collect',
    content: `We collect several types of information from and about users of our app:

**Personal Information:**
• Name and email address (for account creation)
• Phone number (optional, for account recovery)
• Profile information and preferences

**Financial Information:**
• Income and expense data you enter
• Savings goals and financial targets
• Transaction categories and amounts
• Bank account information (Premium users only)

**Device Information:**
• Device type and operating system
• App version and usage statistics
• IP address and location data
• Crash reports and performance data

**Usage Information:**
• App features you use most frequently
• Time spent in different sections
• Settings and preferences
• Search queries and interactions`
  },
  {
    id: 'how-we-use',
    title: '3. How We Use Your Information',
    content: `We use the information we collect for the following purposes:

**To Provide Our Services:**
• Process your transactions and track expenses
• Generate reports and analytics
• Sync data across your devices
• Provide customer support

**To Improve Our App:**
• Analyze usage patterns and preferences
• Identify and fix bugs or issues
• Develop new features and improvements
• Optimize app performance

**To Communicate With You:**
• Send important updates and notifications
• Respond to your questions and support requests
• Send marketing communications (with your consent)
• Provide account-related information

**For Security and Compliance:**
• Protect against fraud and unauthorized access
• Comply with legal obligations
• Enforce our terms of service
• Maintain app security`
  },
  {
    id: 'sharing',
    title: '4. Information Sharing and Disclosure',
    content: `We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:

**With Your Consent:**
• When you explicitly authorize us to share information
• For features that require third-party integration

**Service Providers:**
• Cloud storage and hosting services
• Analytics and crash reporting tools
• Payment processors (for premium subscriptions)
• Customer support platforms

**Legal Requirements:**
• When required by law or legal process
• To protect our rights and property
• In emergency situations to protect user safety

**Business Transfers:**
• In connection with a merger, acquisition, or sale of assets
• With appropriate safeguards and user notification

**Aggregated Data:**
• We may share anonymized, aggregated data for research and analytics
• This data cannot be used to identify individual users`
  },
  {
    id: 'data-security',
    title: '5. Data Security',
    content: `We implement appropriate technical and organizational measures to protect your personal information:

**Encryption:**
• All data is encrypted in transit using SSL/TLS
• Sensitive data is encrypted at rest
• Financial information receives additional encryption

**Access Controls:**
• Limited access to personal data on a need-to-know basis
• Regular security audits and assessments
• Employee training on data protection

**Infrastructure Security:**
• Secure cloud hosting with industry-standard protections
• Regular security updates and patches
• Monitoring for suspicious activities

**Incident Response:**
• Procedures for detecting and responding to security incidents
• User notification in case of data breaches
• Cooperation with law enforcement when required

While we strive to protect your information, no method of transmission over the internet is 100% secure.`
  },
  {
    id: 'data-retention',
    title: '6. Data Retention',
    content: `We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy:

**Account Data:**
• Retained while your account is active
• Deleted within 30 days of account deletion
• Some data may be retained longer for legal compliance

**Financial Data:**
• Transaction data retained for 7 years (tax compliance)
• Analytics data retained for 2 years
• Backup data retained for 90 days

**Usage Data:**
• App usage statistics retained for 1 year
• Crash reports retained for 6 months
• Performance data retained for 2 years

**Marketing Data:**
• Marketing preferences retained until you opt out
• Communication history retained for 2 years

You can request deletion of your data at any time through the app settings.`
  },
  {
    id: 'your-rights',
    title: '7. Your Rights and Choices',
    content: `You have certain rights regarding your personal information:

**Access and Portability:**
• Request a copy of your personal data
• Export your data in a machine-readable format
• Access your data through the app

**Correction and Updates:**
• Update your account information
• Correct inaccurate data
• Modify your preferences

**Deletion:**
• Delete your account and associated data
• Request deletion of specific information
• Opt out of data collection

**Opt-Out:**
• Unsubscribe from marketing communications
• Disable analytics and tracking
• Control notification preferences

**Data Processing:**
• Object to certain data processing
• Request restriction of processing
• Withdraw consent where applicable

To exercise these rights, contact us through the app or email us at privacy@expensetracker.com.`
  },
  {
    id: 'cookies',
    title: '8. Cookies and Tracking Technologies',
    content: `We use various technologies to collect and store information:

**App Analytics:**
• Usage tracking to improve app performance
• Crash reporting to identify and fix issues
• Performance monitoring for optimization

**Third-Party Services:**
• Google Analytics for usage insights
• Firebase for crash reporting
• Payment processors for transactions

**Local Storage:**
• App preferences and settings
• Cached data for offline functionality
• Session information

**Device Identifiers:**
• Device ID for app functionality
• Advertising ID (with consent)
• Location data (with permission)

You can control these settings through your device settings and app preferences.`
  },
  {
    id: 'children',
    title: '9. Children\'s Privacy',
    content: `Our app is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.

**Age Requirements:**
• Users must be at least 13 years old
• Parental consent required for users under 18
• No collection of personal information from children under 13

**Parental Rights:**
• Parents can review their child's information
• Request deletion of child's data
• Refuse further collection or use

If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information promptly.

If you believe we have collected information from a child under 13, please contact us immediately.`
  },
  {
    id: 'international',
    title: '10. International Data Transfers',
    content: `Your information may be transferred to and processed in countries other than your own:

**Data Processing Locations:**
• United States (primary processing location)
• European Union (for EU users)
• Other countries where our service providers operate

**Legal Safeguards:**
• Standard contractual clauses for EU data transfers
• Adequacy decisions where applicable
• Appropriate security measures

**Your Rights:**
• Information about data transfer locations
• Rights under local data protection laws
• Contact information for local authorities

We ensure that international transfers comply with applicable data protection laws and regulations.`
  },
  {
    id: 'changes',
    title: '11. Changes to This Policy',
    content: `We may update this Privacy Policy from time to time:

**Notification of Changes:**
• We will notify you of significant changes
• Updates will be posted in the app
• Email notifications for major changes

**Continued Use:**
• Your continued use constitutes acceptance of changes
• You can opt out of new data practices
• Account deletion available if you disagree

**Review Process:**
• Regular review and updates of this policy
• Legal compliance monitoring
• User feedback consideration

**Effective Date:**
• Changes become effective upon posting
• Previous versions available upon request
• Clear indication of policy version

We encourage you to review this policy periodically.`
  },
  {
    id: 'contact',
    title: '12. Contact Us',
    content: `If you have any questions about this Privacy Policy, please contact us:

**Email:** privacy@expensetracker.com
**Address:** [Your Company Address]
**Phone:** [Your Phone Number]

**Data Protection Officer:**
Email: dpo@expensetracker.com

**EU Representative:**
[EU Representative Details]

**Response Time:**
• We aim to respond within 30 days
• Urgent requests handled within 7 days
• Complex requests may take longer

**Complaints:**
• Contact us first to resolve issues
• Right to lodge complaint with supervisory authority
• Information about complaint procedures

Last updated: ${new Date().toLocaleDateString()}`
  }
];

export default function PrivacyPolicyScreen() {
  const router = useRouter();
  const [expandedSection, setExpandedSection] = useState<string | null>('introduction');

  const handleSectionToggle = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <View className='flex-1 bg-stone-950 pt-20'>
      {/* Header */}
      <View className='flex-row items-center justify-between w-full p-4'>
        <TouchableOpacity 
          className='bg-stone-800 rounded-xl p-2'
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={24} color="#CBFD03" />
        </TouchableOpacity>
        <Text className='text-white text-4xl font-bold'>Privacy Policy</Text>
        <TouchableOpacity className='bg-stone-800 rounded-xl p-2'>
          <Feather name="info" size={24} color="#CBFD03" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        className='flex-1 bg-stone-950 px-4'
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140, gap: 32 }}
      >

        {/* Introduction */}
        <View className='w-full bg-stone-800 rounded-xl p-6'>
          <Text className='text-white text-xl font-bold mb-4'>Privacy Policy</Text>
          <Text className='text-gray-400 text-base mb-4'>
            This Privacy Policy explains how we collect, use, and protect your personal information when you use the Expense Tracker app.
          </Text>
          <Text className='text-gray-400 text-sm'>
            Last updated: {new Date().toLocaleDateString()}
          </Text>
        </View>

        {/* Privacy Sections */}
        <View className='w-full'>
          <Text className='text-white text-xl font-bold mb-4'>Privacy Policy Details</Text>
          <View className='bg-stone-800 rounded-xl p-4 gap-2'>
            {privacySections.map((section) => (
              <View key={section.id} className='border-b border-stone-700 last:border-b-0'>
                <TouchableOpacity
                  className='flex-row items-center justify-between w-full p-4'
                  onPress={() => handleSectionToggle(section.id)}
                >
                  <Text className='text-white text-base font-semibold flex-1 mr-4'>
                    {section.title}
                  </Text>
                  <Feather 
                    name={expandedSection === section.id ? "chevron-up" : "chevron-down"} 
                    size={20} 
                    color="#CBFD03" 
                  />
                </TouchableOpacity>
                {expandedSection === section.id && (
                  <View className='px-4 pb-4'>
                    <Text className='text-gray-400 text-sm leading-6'>
                      {section.content}
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Data Rights Summary */}
        <View className='w-full bg-stone-800 rounded-xl p-6'>
          <Text className='text-white text-lg font-semibold mb-4'>Your Data Rights</Text>
          <View className='space-y-3'>
            <View className='flex-row items-start gap-3'>
              <Feather name="eye" size={16} color="#CBFD03" style={{ marginTop: 2 }} />
              <Text className='text-gray-400 text-sm flex-1'>
                <Text className='text-white font-semibold'>Access:</Text> View and download your data
              </Text>
            </View>
            <View className='flex-row items-start gap-3'>
              <Feather name="edit" size={16} color="#CBFD03" style={{ marginTop: 2 }} />
              <Text className='text-gray-400 text-sm flex-1'>
                <Text className='text-white font-semibold'>Correct:</Text> Update inaccurate information
              </Text>
            </View>
            <View className='flex-row items-start gap-3'>
              <Feather name="trash-2" size={16} color="#CBFD03" style={{ marginTop: 2 }} />
              <Text className='text-gray-400 text-sm flex-1'>
                <Text className='text-white font-semibold'>Delete:</Text> Remove your data completely
              </Text>
            </View>
            <View className='flex-row items-start gap-3'>
              <Feather name="x-circle" size={16} color="#CBFD03" style={{ marginTop: 2 }} />
              <Text className='text-gray-400 text-sm flex-1'>
                <Text className='text-white font-semibold'>Opt-out:</Text> Stop data collection and processing
              </Text>
            </View>
          </View>
        </View>

        {/* Contact Privacy Team */}
        <View className='w-full bg-stone-800 rounded-xl p-4 mb-20'>
          <Text className='text-white text-lg font-semibold mb-3'>Questions About Privacy?</Text>
          <Text className='text-gray-400 text-sm mb-4'>
            If you have any questions about our privacy practices or want to exercise your data rights, please contact our privacy team.
          </Text>
          <TouchableOpacity className='bg-[#CBFD03] rounded-xl p-3 items-center'>
            <Text className='text-black text-base font-semibold'>Contact Privacy Team</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
