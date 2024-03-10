const mongoose = require('mongoose');
const clientSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    director:{
        type: Array,
        required: [true, 'Please enter the director'],
    },
    guardianFullName:{
        type: String,
        // required: [true, 'Please enter the guardian full name'],
    },
    email:{
        type: String,
        // required: [true, 'Please enter the email'],
        unique: true,
    },
    phoneNumber:{
        type: String,
        // required: [true, 'Please enter the phone number'],
    },
    customClientNumber:{
        type: String,
        // required: [true, 'Please enter the custom client number'],
    },
    dateOfBirth:{
        type: Date,
        // required: [true, 'Please enter the date of birth'],
    },
    firstName:{
        type: String,
        required: [true, 'Please enter the first name'],
    },
    middleName:{
        type: String,
        // required: [true, 'Please enter the middle name'],
    },
    lastName:{
        type: String,
        required: [true, 'Please enter the last name'],
    },
    gender:{
        type: String,
        // required: [true, 'Please enter your gender'],
    },
    SSN:{
        type: String,
        // required: [true, 'Please enter your SSN'],
    },
    address1:{
        type: String,
        // required: [true, 'Please enter your address'],
    },
    address2:{
        type: String,
        // required: [true, 'Please enter your address'],
    },
    country:{
        type: String,
        // required: [true, 'Please enter your country'],
    },
    state:{
        type: String,
        // required: [true, 'Please enter your state'],
    },
    city:{
        type: String,
        // required: [true, 'Please enter your city'],
    },


    // primary payer details
    primaryPayer:{
        type: [String],
        required: [true, 'Please enter the primary payer'],
    },
    insuranceID:{
        type: String,
        // required: [true, 'Please enter the insurance ID'],
    },
    groupPolicyNumber:{
        type: String,
        // required: [true, 'Please enter the group policy number'],
    },
    insuranceCopayment:{
        type: String,
        // required: [true, 'Please enter the insurance copayment'],
    },
    relationshipToPatient:{
        type: Array,
        // required: [true, 'Please enter the relationship to patient'],
    },
    insuranceNumberFor837p:{
        type: String,
        // required: [true, 'Please enter the insurance number for 837p'],
    },
    insuredFirstName:{
        type: String,
        // required: [true, 'Please enter the insured first name'],
    },
    insuredMiddleName:{
        type: String,
        // required: [true, 'Please enter the insured middle name'],
    },
    insuredLastName:{
        type: String,
        // required: [true, 'Please enter the insured last name'],
    },
    primaryInsuredGender:{
        type: String,
        // required: [true, 'Please enter the primary insured gender'],
    },
    insuredAddress:{
        type: String,
        // required: [true, 'Please enter the insured address'],
    },
    insuredCountry:{
        type: String,
        // required: [true, 'Please enter the insured country'],
    },
    insuredState:{
        type: String,
        // required: [true, 'Please enter the insured state'],
    },
    insuredCity:{
        type: String,
        // required: [true, 'Please enter the insured city'],
    },
    insuredZIP:{
        type: String,
        // required: [true, 'Please enter the insured ZIP'],
    },
    primaryIssuedDateOfBirth:{
        type: Date,
        // required: [true, 'Please enter the primary issued date of birth'],
    },
    insuredPhoneNumber:{
        type: String,
        // required: [true, 'Please enter the insured phone number'],
    },


    //secondary payer details
    secondaryPayer:{
        type: [String],
        // required: [true, 'Please enter the secondary payer'],
    },
    insuranceID:{
        type: String,
        // required: [true, 'Please enter the insurance ID'],
    },
    groupPolicyNumber:{
        type: String,
        // required: [true, 'Please enter the group policy number'],
    },
    insuranceCopayment:{
        type: String,
        // required: [true, 'Please enter the insurance copayment'],
    },
    relationshipToPatient:{
        type: Array,
        // required: [true, 'Please enter the relationship to patient'],
    },
    insuranceNumberFor837p:{
        type: String,
        // required: [true, 'Please enter the insurance number for 837p'],
    },
    insuredFirstName:{
        type: String,
        // required: [true, 'Please enter the insured first name'],
    },
    insuredMiddleName:{
        type: String,
        // required: [true, 'Please enter the insured middle name'],
    },
    insuredLastName:{
        type: String,
        // required: [true, 'Please enter the insured last name'],
    },
    secondaryInsuredGender:{
        type: String,
        // required: [true, 'Please enter the secondary insured gender'],
    },
    insuredAddress:{
        type: String,
        // required: [true, 'Please enter the insured address'],
    },
    insuredCountry:{
        type: String,
        // required: [true, 'Please enter the insured country'],
    },
    insuredState:{
        type: String,
        // required: [true, 'Please enter the insured state'],
    },
    insuredCity:{
        type: String,
        // required: [true, 'Please enter the insured city'],
    },
    insuredZIP:{
        type: String,
        // required: [true, 'Please enter the insured ZIP'],
    },
    secondaryIssuedDateOfBirth:{
        type: Date,
        // required: [true, 'Please enter the secondary issued date of birth'],
    },
    insuredPhoneNumber:{
        type: String,
        // required: [true, 'Please enter the insured phone number'],
    },


    //client diagnosis codes

    //Referral, Coordinator & Service Details
    referringPhysicianNPI:{
        type: String,
        // required: [true, 'Please enter the referring physician NPI'],
    },
    referringPhysicianTaxonomy:{
        type: String,
        // required: [true, 'Please enter the referring physician taxonomy'],
    },
    referringPhysicianMedicaidNumber:{
        type: String,
        // required: [true, 'Please enter the referring physician medicaid number'],
    },
    referringPhysicianFirstName:{
        type: String,
        // required: [true, 'Please enter the referring physician first name'],
    },
    referringPhysicianMiddleName:{
        type: String,
        // required: [true, 'Please enter the referring physician middle name'],
    },
    referringPhysicianLastName:{
        type: String,
        // required: [true, 'Please enter the referring physician last name'],
    },
    referringPhysicianPhone:{
        type: String,
        // required: [true, 'Please enter the referring physician phone'],
    },
    referringPhysicianFAX:{
        type: String,
        // required: [true, 'Please enter the referring physician FAX'],
    },
    referringPhysicianLastEmail:{
        type: String,
        // required: [true, 'Please enter the referring physician last email'],
    },
    referralExpirationDate:{
        type: Date,
        // required: [true, 'Please enter the referral expiration date'],
    },
    MDLicenseNumber:{
        type: String,
        // required: [true, 'Please enter the MD license number'],
    },
    serviceLocation:{
        type: String,
        // required: [true, 'Please enter the service location'],
    },
    startOfServiceAt:{
        type: Date,
        // required: [true, 'Please enter the start of service at'],
    },
    initialAssessmentAt:{
        type: Date,
        // required: [true, 'Please enter the initial assessment at'],
    },
    initialBASPAT:{
        type: Date,
        // required: [true, 'Please enter the initial BASPAT'],
    },
    coordinatorApprovalAt:{
        type: Date,
        // required: [true, 'Please enter the coordinator approval at'],
    },
    coordinatorFullName:{
        type: String,
        // required: [true, 'Please enter the coordinator full name'],
    },
    coordinatorEmail:{
        type: String,
        // required: [true, 'Please enter the coordinator email'],
    },
    coordinatorPhoneNumber:{
        type: String,
        // required: [true, 'Please enter the coordinator phone number'],
    },
    supportPlanAt:{
        type: Date,
        // required: [true, 'Please enter the support plan at'],
    },
    weeklyBCBABCaBAAnalystHours:{
        type: String,
        // required: [true, 'Please enter the weekly BCBA/CaBA Analyst hours'],
    },
    weeklyRBTAssistantHours:{
        type: String,
        // required: [true, 'Please enter the weekly RBT Assistant hours'],
    },
    terminationDate:{
        type: Date,
        // required: [true, 'Please enter the termination date'],
    },



},
{
    timestamps: true
}
)

const clientModel = mongoose.model('clients', clientSchema);
module.exports = clientModel;
  
