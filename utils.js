function linearInterpolation(a, b, t) {
    return a + (b - a) * t; 
}

function getIntersection(a, b, c, d) {
    const tTop = (d.x - c.x) * (a.y - c.y) - (d.y - c.y) * (a.x - c.x);
    const uTop = (c.y - a.y) * (a.x - b.x) - (c.x - a.x) * (a.y - b.y);
    const bottom = (d.y - c.y) * (b.x - a.x) - (d.x - c.x) * (b.y - a.y);

    if (bottom !== 0) {
        const t = tTop / bottom;
        const u = uTop / bottom;

        if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
            return {
                x: linearInterpolation(a.x, b.x, t),
                y: linearInterpolation(a.y, b.y, t),
                offset: t
            };
        }
    }

    return null;
}

//O(n * m)
// function polysIntersection(poly1, poly2) {
//     for (let i = 0; i < poly1.length; i++) {
//         for (let j = 0;j < poly2.length; j++) {
//             const touch = getIntersection(
//                 poly1[i],
//                 poly1[(i + 1) % poly1.length],
//                 poly2[j],
//                 poly2[(j + 1) % poly2.length]
//                 );

//             if (touch) {
//                 return true;
//             }
//         }
//     }

//     return false;
// }

// O(n + m)
function polysIntersection(poly1, poly2) {
    function getNormals(poly) {
        const normals = [];

        for (let i = 0; i < poly.length; i++) {
            const current = poly[i];
            const next = poly[(i + 1) % poly.length];
            const edge = { x: next.x - current.x, y: next.y - current.y };
            const normal = { x: edge.y, y: -edge.x };

            const length = Math.hypot(normal.x, normal.y);
            normals.push({ x: normal.x / length, y: normal.y / length });
        }

        return normals;
    }

    function projectPoly(poly, axis) {
        let min = Number.MAX_VALUE;
        let max = Number.MIN_VALUE;

        for (let i = 0; i < poly.length; i++) {
            const dotProduct = poly[i].x * axis.x + poly[i].y * axis.y;
            min = Math.min(min, dotProduct);
            max = Math.max(max, dotProduct);
        }

        return { min, max };
    }

    function overlap(projection1, projection2) {
        return projection1.min <= projection2.max && projection2.min <= projection1.max;
    }

    const normals1 = getNormals(poly1);
    const normals2 = getNormals(poly2);

    for (const normal of [...normals1, ...normals2]) {
        const projection1 = projectPoly(poly1, normal);
        const projection2 = projectPoly(poly2, normal);

        if (!overlap(projection1, projection2)) {
            return false;
        }
    }

    return true;
}

function getRGBA(value){
    const alpha = Math.abs(value);
    const R = value < 0 ? 0 : 255;
    const G = R;
    const B = value > 0 ? 0 : 255;
    return "rgba("+R+","+G+","+B+","+alpha+")";
}
        