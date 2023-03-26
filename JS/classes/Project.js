// CRETEAD BY PHILIP DROUBI

export class Project {
    static projectsData = [];
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

    addProject() {
        Project.projectsData.push(this);
    }
}

/**
 * Types 1 : front
 * 2 : Back
 * 3 : others
 */