import { isBoolean, isInteger, verifyExists, verifyTooLong, isPositiveInteger, isValidDateTime, parseDate, formatDate, isEmpty, isValidDate } from '../validator/ValidationUtil.js'


export function updateTicketValidateByStaff(req, res, next) {
    let { ticket_id, new_status, note, date_activity, time_spent } = req.body;
    let v = verifyExists(ticket_id);
    if (v) return next(v);
    v = verifyExists(new_status);
    if (v) return next(v);
    v = verifyExists(note);
    if (v) return next(v);
    v = verifyExists(date_activity);
    if (v) return next(v);
    v = verifyExists(time_spent);
    if (v) return next(v);

    let vtL = verifyTooLong(note, 255)
    if (vtL) return next(vtL);


    let isI = isInteger(ticket_id);
    if (isI) return next(isI);
    isI = isInteger(new_status);
    if (isI) return next(isI);
    isI = isInteger(time_spent);
    if (isI) return next(isI);

    let isP = isPositiveInteger(ticket_id);
    if (isP) return next(isP);
    isP = isPositiveInteger(new_status);
    if (isP) return next(isP);
    isP = isPositiveInteger(time_spent);
    if (isP) return next(isP);

    let fmtDate = isValidDate(date_activity, 'YYYY-MM-DD');
    if (fmtDate) return next(fmtDate);
    return next();
}


export function updateTransferTicketValidate(req, res, next) {
    let { ticket_id, new_group, new_assignee, time_spent, note, date_of_activity } = req.body;

    let v = verifyExists(ticket_id);
    if (v) return next(v);
    v = verifyExists(new_group);
    if (v) return next(v);
    v = verifyExists(new_assignee);
    if (v) return next(v);
    v = verifyExists(note);
    if (v) return next(v);
    v = verifyExists(time_spent);
    if (v) return next(v);
    v = verifyExists(date_of_activity);
    if (v) return next(v);

    let vtL = verifyTooLong(note, 255)
    if (vtL) return next(vtL);

    let isI = isInteger(ticket_id);
    if (isI) return next(isI);
    isI = isInteger(new_group);
    if (isI) return next(isI);
    isI = isInteger(time_spent);
    if (isI) return next(isI);

    let isP = isPositiveInteger(ticket_id);
    if (isP) return next(isP);
    isP = isPositiveInteger(time_spent);
    if (isP) return next(isP);

    let fmtDate = isValidDate(date_of_activity, 'YYYY-MM-DD');
    if (fmtDate) return next(fmtDate);
    return next();
}

export function updateCommentTicketValidate(req, res, next) {
    let { ticket_id, note, date_activity, time_spent } = req.body;
    let v = verifyExists(ticket_id);
    if (v) return next(v);
    v = verifyExists(note);
    if (v) return next(v);
    v = verifyExists(date_activity);
    if (v) return next(v);
    v = verifyExists(time_spent);
    if (v) return next(v);

    let isI = isInteger(ticket_id);
    if (isI) return next(isI);
    isI = isInteger(time_spent);
    if (isI) return next(isI);

    let vtL = verifyTooLong(note, 255)
    if (vtL) return next(vtL);

    let isP = isPositiveInteger(ticket_id);
    if (isP) return next(isP);
    isP = isPositiveInteger(time_spent);
    if (isP) return next(isP);

    let fmtDate = isValidDate(date_activity, 'YYYY-MM-DD');
    if (fmtDate) return next(fmtDate);
    return next();
}


export function createTicketByStaffValidate(req, res, next) {
    let {
        customer_name,
        project_id,
        summary,
        group_id,
        priority_id,
        scope,
        description_by_staff,
        request_type_id,
        sizing_id,
        resolved_date,
        component_name,
        time_spent,
        activity_date,
        assignee_name } = req.body;
    let v = verifyExists(customer_name);
    if (v) return next(v);
    v = verifyExists(project_id);
    if (v) return next(v);
    v = verifyExists(summary);
    if (v) return next(v);
    v = verifyExists(group_id);
    if (v) return next(v);
    v = verifyExists(priority_id);
    if (v) return next(v);
    // v = verifyExists(scope);
    // if (v) return next(v);
    v = verifyExists(description_by_staff);
    if (v) return next(v);
    v = verifyExists(request_type_id);
    if (v) return next(v);
    v = verifyExists(sizing_id);
    if (v) return next(v);
    v = verifyExists(resolved_date);
    if (v) return next(v);
    v = verifyExists(component_name);
    if (v) return next(v);
    v = verifyExists(time_spent);
    if (v) return next(v);
    v = verifyExists(activity_date);
    if (v) return next(v);
    v = verifyExists(assignee_name);
    if (v) return next(v);

    let vtL = verifyTooLong(customer_name, 255)
    if (vtL) return next(vtL);
    vtL = verifyTooLong(description_by_staff, 255)
    if (vtL) return next(vtL);

    // isI = isInteger(project_id);
    // if (isI) return next(isI);
    // isI = isInteger(group_id);
    // if (isI) return next(isI);
    // isI = isInteger(priority_id);
    // if (isI) return next(isI);
    // isI = isInteger(request_type_id);
    // if (isI) return next(isI);
    // isI = isInteger(sizing_id);
    // if (isI) return next(isI);
    // isI = isInteger(scope);
    // if (isI) return next(isI);


    // isP = isPositiveInteger(project_id);
    // if (isP) return next(isP);
    // isP = isPositiveInteger(group_id);
    // if (isP) return next(isP);
    // isP = isPositiveInteger(priority_id);
    // if (isP) return next(isP);
    // isP = isPositiveInteger(request_type_id);
    // if (isP) return next(isP);
    // isP = isPositiveInteger(sizing_id);
    // if (isP) return next(isP);
    // isP = isPositiveInteger(scope);
    // if (isP) return next(isP);


    let fmtDate = isValidDate(resolved_date, 'YYYY-MM-DD');
    if (fmtDate) return next(fmtDate);
    return next();
}

export function loginValidate(req, res, next) {
    let { username, password } = req.body;
    let v = verifyExists(username);
    if (v) return next(v);
    v = verifyExists(password);
    if (v) return next(v);
    return next();
}