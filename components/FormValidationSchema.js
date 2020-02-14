import * as yup from 'yup';

export const PaymentFormSchema = yup.object().shape({
  budget: yup.number().required().positive().integer('enter a valid value'),
  university:yup.string().required().matches(/^[a-zA-Z, ]+$/),
  phone:yup.string()
            .min(6)
            .max(15)
            .matches(/^[0-9]*$/)
            .required(),
  email:yup.string().email().required(),
  fullname:yup.string().matches(/^[a-zA-Z ]+$/).required(),
  roomType:yup.string().required(),
  moveIn:yup.string().required(),
  leaseDuration:yup.string().required(),
});

export const EnquireNowFormSchema = yup.object().shape({
  fullname:yup.string().required().matches(/^[a-zA-Z ]+$/),
  phone:yup.string()
            .min(6)
            .max(15)
            .matches(/^[0-9]*$/)
            .required(),
  email:yup.string().email().required(),
  university:yup.string()
                .required()
                .matches(/^[a-zA-Z, ]+$/),
});

export const InfoFormSchema = yup.object().shape({
  fullname:yup.string().required().matches(/^[a-zA-Z ]+$/),
  phone:yup.string()
            .min(6)
            .max(15)
            .matches(/^[0-9]*$/)
            .required(),
  email:yup.string().email().required(),
});

export const GetInTouchSchema = yup.object().shape({
  fullname:yup.string().required().matches(/^[a-zA-Z ]+$/),
  phone:yup.string()
            .min(6)
            .max(15)
            .matches(/^[0-9]*$/)
            .required(),
  email:yup.string().email().required(),
  university:yup.string().required().matches(/^[a-zA-Z, ]+$/),
  leaseDuration:yup.string().required(),
  budget:yup.string().required(),
});

export const SubscriptionSchema = yup.object().shape({
  email:yup.string().email().required(),
});

export const BookingFormSchema = yup.object().shape({
  fullname:yup.string().required().matches(/^[a-zA-Z ]+$/),
  dob:yup.string().required(),
  gender:yup.string().required().matches(/^[a-zA-Z ]+$/),
  nationality:yup.string().required().matches(/^[a-zA-Z ]+$/),
  country:yup.string().required().matches(/^[a-zA-Z ]+$/),
  email:yup.string().email().required(),
  alternative_email:yup.string().email(),
  phone:yup.string().min(6).max(15).matches(/^[0-9]*$/).required(),
  homePhone:yup.string().min(6).max(15).matches(/^[0-9]*$/).required(),
  uni_info:yup.string().required().matches(/^[a-zA-Z, ]+$/),
  course_info:yup.string().required().matches(/^[a-zA-Z,\. ]+$/),
  enroll_status:yup.string().required(),
  home_addr_one:yup.string().required(),
  home_addr_two:yup.string(),
  home_city:yup.string().required(),
  home_state:yup.string().required().matches(/^[a-zA-Z,]+$/),
  home_zip:yup.string().min(4).max(12).required(),
  emergency_contact_name:yup.string().required().matches(/^[a-zA-Z, ]+$/),
  emergency_salutation:yup.string().required(),
  emergency_contact_numb:yup.string().min(6).max(15).matches(/^[0-9]*$/).required(),
  emergency_dob:yup.string().required(),
  emergency_email_addr:yup.string().required().email(),
  emergency_relship:yup.string().required().matches(/^[a-zA-Z,]+$/),
  emergency_addr_one:yup.string().required(),
  emergency_addr_two:yup.string(),
  emergency_home_city:yup.string().required(),
  emergency_home_state:yup.string().required().matches(/^[a-zA-Z,]+$/),
  emergency_home_zip:yup.string().min(4).max(12).required(),
  guarantor_as_emergency:yup.string().required(),
  guarantor_contact_name:yup.string(),
  guarantor_salutation:yup.string(),
  guarantor_contact_numb:yup.string().min(6).max(15).matches(/^[0-9]*$/),
  guarantor_email:yup.string().email(),
  guarantor_relship:yup.string(),
  guarantor_addr_one:yup.string(),
  guarantor_addr_two:yup.string(),
  guarantor_home_city:yup.string(),
  guarantor_home_state:yup.string(),
  guarantor_home_zip:yup.string().min(4).max(12),
  otherPeopleDetails:yup.string(),
  special_requirements:yup.string(),
  roomType:yup.string().required(),
  rentAmount:yup.string().matches(/^[0-9]*$/),
  medical_status:yup.string().required(),
  moveIndate:yup.string().required(),
  stay_duration:yup.string().required()
});

export const ListHomeSchema = yup.object().shape({
  fullname:yup.string().required(),
  contact:yup.string().required().min(6).max(15).matches(/^[0-9]*$/).required(),
  email:yup.string().email().required(),
  city:yup.string().required(),
  nearestUniversity:yup.string().required(),
  months:yup.string().required(),
  priceRange:yup.string().required()
});

export const ContactUsSchema = yup.object().shape({
  fullname:yup.string().required(),
  email:yup.string().required().email(),
  message:yup.string().required()
});

export const ReferSchema = yup.object().shape({
  fullname: yup.string().required(),
  email:yup.string().required().email(),
  referfullname:yup.string().required(),
  referemail:yup.string().required().email(),
  referphone:yup.string().required().min(6).max(15).matches(/^[0-9]*$/).required(),
  referuniversity:yup.string().required()
});
