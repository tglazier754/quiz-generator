

//database

//table names
export const TABLE_RESOURCES = "resources";
export const TABLE_USERS = "users";
export const TABLE_USER_RESOURCES = "user_resources";
export const TABLE_QUIZ_QUESTIONS = "quiz_questions";
export const TABLE_QUIZ_QUESTION_OPTIONS = "quiz_question_options";

//page sizes
export const DEFAULT_SELECT_PAGE_OFFSET = 0;
export const DEFAULT_PAGE_SIZE = 25;

//url params
export const URL_PARAM_OFFSET = "offset";
export const URL_PARAM_COUNT = "count";
export const URL_PARAM_RESOURCE_TYPE = "type";
export const URL_PARAM_RESOURCE_ID = "resource_id"

//resource origins
export const RESOURCE_ORIGIN_USER = "USER";
export const RESOURCE_ORIGIN_GENERATED = "GENERATED";

//resource types
export const RESOURCE_TYPE_TEXT = "TEXT";
export const RESOURCE_TYPE_WEBSITE = "WEBSITE_SCAN";
export const RESOURCE_TYPE_IMAGE = "IMAGE_SCAN";

export const RESOURCE_TYPE_QUIZ = "QUIZ";
export const RESOURCE_TYPE_SUMMARY = "SUMMARY";
export const RESOURCE_TYPE_LESSON_PLAN = "LESSON_PLAN";

export const USER_RESOURCE_TYPES = [RESOURCE_TYPE_TEXT, RESOURCE_TYPE_WEBSITE, RESOURCE_TYPE_IMAGE];
export const MACHINE_GENERATED_TYPES = [RESOURCE_TYPE_QUIZ, RESOURCE_TYPE_LESSON_PLAN];//add summary back in later

export const ALL_RESOURCE_TYPES = USER_RESOURCE_TYPES.concat(MACHINE_GENERATED_TYPES);

export const GRADE_LEVELS = ["Pre-school", "K-1", "2-3", "4-5", "6", "7-8", "9", "10", "11", "12", "College", "University"];



export const testImageDataURl = "data:image/png;base64,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008/TbqqClT33nvvor6sx8bPP/+8OHny5OLHH3+cVLMeVEGwrvf6668ffc4ff/yx+OyzzxZffvnl5LoXwwMrID/44IM73spLL720DJ9Txs0337y44447lsa9UUGtAuyHH364KOOpY65emPr6HkeAwE4BAUtHEJhZoGYpHn744cUll1wy+ZUqEJ0+fXrt448cObI4fPjw5JqffvrpMhBtGjUz89BDD2162Nm/rxmXCoXbzuBMfoH/ogdWUH7yySeXM07DMTVgPfLII8tZqymjPMu1fDeNuXph0+v6ewIExgUELN1BYEaBmll69NFHtwpXq8t54403lktGvXHrrbcu7rzzzq2v/NSpU4vPP/989Hk1C1IhYJswWMVqduz48eNbX8//2hPGAtKUgFWzXjX7te146623FjULOTbm6oVtr9PjCRDYKSBg6QgCMwo8/fTTyz1Rw1FLSd99991yz1UtCdaXbn1Jto+rcFUhqx21d+vxxx8/579X3VparLAz3I/VPnBdcOtdb82krPYG/ec//1nWrn0+7fj4448v6uXC2267bbm01xubAtZYCKrPvz6v8q0+qP1Ybbitx7z66qvdGcI5e2HG/y2UJrAvBASsffExe5MXQqD3pVpflq+//vo5m9krXNVMVwWY4XjzzTeXm9WHo5bvVhusV/+9ZjhqpqMd999//zn7viqEvf322+c8tne9Fdrqy73dfF/7iGqPVhscK2hcjKNmIh977LHRt7YpYPWCa80k1oxiO2oJsg2wYzOPc/XCxfgZek8EzreAgHW+xb3evhFov1THwtUKpPcl3n6x9mYsaiP0a6+9NroHqv3CrhmpCgTtnqn2euvvK+CNLVP2wts777yz3KB9sY2nnnpqdFN6vdd1AasXXOuu0dpf1Rv1GVeYG85k1R2GFcyHY85euNg+P++HwIUQELAuhLrXvOgFbrzxxsV99923433WXWFff/312vfehqH2i/iuu+5aHDp0aEeNTXt0atmpZseG46OPPlp89dVXZ/9TLfvVRvzh+OKLLxaffPLJ2ut99tlndwSBdcFhXaG6u7KdlavN3VVv3Sjnuvaaaas/FQpr+XUsFO6m8epzrNdZjQq07QzTuoBVYWl4l2dd44svvrj2UmopspYkh+Pll1/eMZM4Vy/sxshzCBA4V0DA0hUEZhBov5Try3/K8lmFjOHRCBUW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ELD0AAECBAgQIEAgLCBghUGVI0CAAAECBAgIWHqAAAECBAgQIBAWELDCoMoRIECAAAECBAQsPUCAAAECBAgQCAsIWGFQ5QgQIECAAAECApYeIECAAAECBAiEBQSsMKhyBAgQIECAAAEBSw8QIECAAAECBMICAlYYVDkCBAgQIECAgIClBwgQIECAAAECYQEBKwyqHAECBAgQIEBAwNIDBAgQIECAAIGwgIAVBlWOAAECBAgQICBg6QECBAgQIECAQFhAwAqDKkeAAAECBAgQELD0AAECBAgQIEAgLCBghUGVI0CAAAECBAgIWHqAAAECBAgQIBAWELDCoMoRIECAAAECBAQsPUCAAAECBAgQCAsIWGFQ5QgQIECAAAECApYeIECAAAECBAiEBQSsMKhyBAgQIECAAAEBSw8QIECAAAECBMICAlYYVDkCBAgQIECAgIClBwgQIECAAAECYQEBKwyqHAECBAgQIEBAwNIDBAgQIECAAIGwgIAVBlWOAAECBAgQICBg6QECBAgQIECAQFhAwAqDKkeAAAECBAgQELD0AAECBAgQIEAgLCBghUGVI0CAAAECBAgIWHqAAAECBAgQIBAWELDCoMoRIECAAAECBAQsPUCAAAECBAgQCAsIWGFQ5QgQIECAAAECApYeIECAAAECBAiEBQSsMKhyBAgQIECAAAEBSw8QIECAAAECBMICAlYYVDkCBAgQIECAgIClBwgQIECAAAECYQEBKwyqHAECBAgQIEBAwNIDBAgQIECAAIGwgIAVBlWOAAECBAgQICBg6QECBAgQIECAQFhAwAqDKkeAAAECBAgQELD0AAECBAgQIEAgLCBghUGVI0CAAAECBAgIWHqAAAECBAgQIBAWELDCoMoRIECAAAECBAQsPUCAAAECBAgQCAsIWGFQ5QgQIECAAAECApYeIECAAAECBAiEBQSsMKhyBAgQIECAAAEBSw8QIECAAAECBMICAlYYVDkCBAgQIECAgIClBwgQIECAAAECYQEBKwyqHAECBAgQIEBAwNIDBAgQIECAAIGwgIAVBlWOAAECBAgQICBg6QECBAgQIECAQFhAwAqDKkeAAAECBAgQELD0AAECBAgQIEAgLCBghUGVI0CAAAECBAgIWHqAAAECBAgQIBAWELDCoMoRIECAAAECBAQsPUCAAAECBAgQCAsIWGFQ5QgQIECAAAECApYeIECAAAECBAiEBQSsMKhyBAgQIECAAAEBSw8QIECAAAECBMICAlYYVDkCBAgQIECAgIClBwgQIECAAAECYQEBKwyqHAECBAgQIEBAwNIDBAgQIECAAIGwgIAVBlWOAAECBAgQICBg6QECBAgQIECAQFhAwAqDKkeAAAECBAgQELD0AAECBAgQIEAgLCBghUGVI0CAAAECBAgIWHqAAAECBAgQIBAWELDCoMoRIECAAAECBAQsPUCAAAECBAgQCAsIWGFQ5QgQIECAAAECApYeIECAAAECBAiEBQSsMKhyBAgQIECAAAEBSw8QIECAAAECBMICAlYYVDkCBAgQIECAgIClBwgQIECAAAECYQEBKwyqHAECBAgQIEBAwNIDBAgQIECAAIGwgIAVBlWOAAECBAgQICBg6QECBAgQIECAQFhAwAqDKkeAAAECBAgQELD0AAECBAgQIEAgLCBghUGVI0CAAAECBAgIWHqAAAECBAgQIBAWELDCoMoRIECAAAECBAQsPUCAAAECBAgQCAsIWGFQ5QgQIECAAAECApYeIECAAAECBAiEBQSsMKhyBAgQIECAAAEBSw8QIECAAAECBMICAlYYVDkCBAgQIECAgIClBwgQIECAAAECYQEBKwyqHAECBAgQIEBAwNIDBAgQIECAAIGwgIAVBlWOAAECBAgQICBg6QECBAgQIECAQFhAwAqDKkeAAAECBAgQELD0AAECBAgQIEAgLCBghUGVI0CAAAECBAgIWHqAAAECBAgQIBAWELDCoMoRIECAAAECBAQsPUCAAAECBAgQCAsIWGFQ5QgQIECAAAECApYeIECAAAECBAiEBQSsMKhyBAgQIECAAAEBSw8QIECAAAECBMICAlYYVDkCBAgQIECAgIClBwgQIECAAAECYQEBKwyqHAECBAgQIEBAwNIDBAgQIECAAIGwgIAVBlWOAAECBAgQICBg6QECBAgQIECAQFhAwAqDKkeAAAECBAgQELD0AAECBAgQIEAgLCBghUGVI0CAAAECBAgIWHqAAAECBAgQIBAWELDCoMoRIECAAAECBAQsPUCAAAECBAgQCAsIWGFQ5QgQIECAAAECApYeIECAAAECBAiEBQSsMKhyBAgQIECAAAEBSw8QIECAAAECBMICAlYYVDkCBAgQIECAgIClBwgQIECAAAECYQEBKwyqHAECBAgQIEBAwNIDBAgQIECAAIGwgIAVBlWOAAECBAgQICBg6QECBAgQIECAQFhAwAqDKkeAAAECBAgQELD0AAECBAgQIEAgLCBghUGVI0CAAAECBAgIWHqAAAECBAgQIBAWELDCoMoRIECAAAECBAQsPUCAAAECBAgQCAsIWGFQ5QgQIECAAAECApYeIEDupyKTAAAA0ElEQVSAAAECBAiEBQSsMKhyBAgQIECAAAEBSw8QIECAAAECBMICAlYYVDkCBAgQIECAgIClBwgQIECAAAECYQEBKwyqHAECBAgQIEBAwNIDBAgQIECAAIGwgIAVBlWOAAECBAgQICBg6QECBAgQIECAQFhAwAqDKkeAAAECBAgQELD0AAECBAgQIEAgLCBghUGVI0CAAAECBAgIWHqAAAECBAgQIBAWELDCoMoRIECAAAECBAQsPUCAAAECBAgQCAsIWGFQ5QgQIECAAAEC/wf56+cE/2gYbwAAAABJRU5ErkJggg==";