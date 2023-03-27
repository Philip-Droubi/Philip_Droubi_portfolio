// CRETEAD BY PHILIP DROUBI

export class Project {
    static projectsData = new Map();
    constructor(id, name = "", codeSite = "", liveSite = "", imgs = [], desc = "", type = 1, techs = [], isFEM = fasle, FEMLink = "", more = "") {
        this.id = id;
        this.name = name;
        this.codeSite = codeSite;
        this.liveSite = liveSite;
        this.imgs = imgs;
        this.desc = desc;
        this.type = type;
        this.techs = techs;
        this.isFEM = isFEM;
        this.FEMLink = FEMLink;
        this.more = more;
    }
}
export function addProject(p) {
    Project.projectsData.set(p.id, p);
    return true;
}

export function getProjectByID(id) {
    return Project.projectsData.get(+id);
}

/**
 * Types 1 : front
 * 2 : Back
 * 3 : others
 */